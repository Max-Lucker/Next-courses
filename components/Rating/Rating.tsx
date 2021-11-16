import { useState, useEffect, KeyboardEvent, forwardRef, ForwardedRef, useRef } from 'react'

import { RatingProps } from '../Rating/Rating.props'

import styles from './Rating.module.css'
import cn from 'classnames'

import StarIcon from './star.svg'

export const Rating = forwardRef(
  ({ tabIndex, isEditable = false, error, rating, setRating, ...props }: RatingProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
    const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>))
    const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([])

    const computeFocus = (r: number, i: number): number => {
      if (!isEditable) {
        return -1
      }

      if (!rating && i == 0) {
        return tabIndex ?? 0
      }

      if (rating && i + 1) {
        return tabIndex ?? 0
      }

      return -1
    }

    useEffect(() => {
      constructRating(rating)
    }, [rating, tabIndex])

    const constructRating = (currentRating: number) => {
      const updatedArray = ratingArray.map((r: JSX.Element, i: number) => {
        return (
          <span
            tabIndex={computeFocus(rating, i)}
            className={cn(styles.star, {
              [styles.filled]: i < currentRating,
              [styles.editable]: isEditable,
            })}
            onMouseEnter={() => changeDisplay(i + 1)}
            onMouseLeave={() => changeDisplay(rating)}
            onClick={() => changeRating(i + 1)}
            onKeyDown={handleKey}
            ref={(r) => ratingArrayRef.current?.push(r)}
            role={isEditable ? 'slider' : ''}
            aria-valuenow={rating}
            aria-valuemax={5}
            aria-valuemin={1}
            aria-label={isEditable ? 'укажите рейтинг' : 'Рейтинг' + rating}
            aria-invalid={error ? true : false}
          >
            <StarIcon />
          </span>
        )
      })
      setRatingArray(updatedArray)
    }

    const changeDisplay = (changebleRating: number) => {
      if (!isEditable) {
        return
      }
      constructRating(changebleRating)
    }

    const changeRating = (changebleRating: number) => {
      if (!isEditable || !setRating) {
        return
      }

      setRating(changebleRating)
    }

    const handleKey = (event: KeyboardEvent) => {
      if (!isEditable && !setRating) {
        return
      }

      if (event.code == 'ArrowRight' || event.code == 'ArrowUp') {
        if (!rating) {
          setRating && setRating(1)
        } else {
          event.preventDefault()
          setRating && setRating(rating > 5 ? rating + 1 : 5)
        }

        ratingArrayRef.current[rating]?.focus()
      }

      if (event.code == 'ArrowLeft' || event.code == 'ArrowDown') {
        event.preventDefault()
        setRating && setRating(rating > 1 ? rating - 1 : 1)

        ratingArrayRef.current[rating - 2]?.focus()
      }
    }

    return (
      <div
        {...props}
        ref={ref}
        className={cn(styles.ratingWrapper, {
          [styles.error]: error,
        })}
      >
        {ratingArray.map((star, idx) => (
          <span key={idx}>{star}</span>
        ))}
        {error && (
          <span role="alert" className={styles.errorMessage}>
            {error.message}
          </span>
        )}
      </div>
    )
  }
)
