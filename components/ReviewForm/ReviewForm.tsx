import { useForm, Controller } from 'react-hook-form'

import axios from 'axios'

import { Rating, Input, Textarea, Button } from '../index'

import { ReviewFormProps } from '../ReviewForm/ReviewForm.props'
import { IReviewForm, IReviewSendResponse } from './ReviewForm.interface'

import styles from './ReviewForm.module.css'
import cn from 'classnames'

import CloseIcon from './close.svg'
import { API } from '../../helpers/api'
import { useState } from 'react'

export const ReviewForm = ({ productId, isOpened, className, ...props }: ReviewFormProps): JSX.Element => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [error, setError] = useState<string>()
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<IReviewForm>()

  const onSubmit = async (formData: IReviewForm) => {
    try {
      const { data } = await axios.post<IReviewSendResponse>(API.review.createDemo, { ...formData })
      if (data.message) {
        setIsSuccess(true)
        reset()
      } else {
        setError('Smth goes wrong!')
      }
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cn(styles.reviewForm, className)} {...props}>
        <Input
          tabIndex={isOpened ? 0 : -1}
          {...register('name', { required: { value: true, message: 'Заполните имя' } })}
          placeholder="Имя"
          error={errors.name}
          aria-invalid={errors.name ? true : false}
        />
        <Input
          tabIndex={isOpened ? 0 : -1}
          {...register('title', { required: { value: true, message: 'Заполните заголовок' } })}
          placeholder="Заголовок отзыва"
          className={styles.title}
          error={errors.title}
          aria-invalid={errors.title ? true : false}
        />
        <div className={styles.rating}>
          <span>Оценка:</span>
          <Controller
            control={control}
            name="rating"
            rules={{ required: { value: true, message: 'Укажите рейтинг' } }}
            render={({ field }) => (
              <Rating tabIndex={isOpened ? 0 : -1} isEditable rating={field.value} ref={field.ref} setRating={field.onChange} error={errors.rating} />
            )}
          />
        </div>
        <Textarea
          tabIndex={isOpened ? 0 : -1}
          {...register('description', { required: { value: true, message: 'Заполните описание' } })}
          placeholder="Текст отзыва"
          className={styles.description}
          error={errors.description}
          aria-label="текст отзыва"
          aria-invalid={errors.description ? true : false}
        />
        <div className={styles.submit}>
          <Button tabIndex={isOpened ? 0 : -1} appearance="primary" onClick={() => clearErrors()}>
            Отправить
          </Button>
          <span className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
        </div>
      </div>
      {isSuccess && (
        <div className={cn(styles.success, styles.panel)} role="alert">
          <div className={styles.successTitle}>Ваш отзыв отправлен</div>
          <div>Спасибо, ваш отзыв будет опубликован после проверки.</div>
          <button className={styles.close} onClick={() => setIsSuccess(false)} aria-label="Закрыть оповещение">
            <CloseIcon />
          </button>
        </div>
      )}
      {error && (
        <div className={cn(styles.error, styles.panel)}>
          Что-то пошло не так, попробуйте обновить страницу
          <button className={styles.close} onClick={() => setError(undefined)} aria-label="Закрыть оповещение">
            <CloseIcon />
          </button>
          <CloseIcon />
        </div>
      )}
    </form>
  )
}
