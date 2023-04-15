import {format} from 'date-fns'

import './index.css'

const AppointmentItem = props => {
  const {each, onStar} = props
  const {title, date, id, isStar} = each

  const onClickStar = () => {
    onStar(id)
  }
  const formatDate = format(new Date(date), 'dd MMMM yyyy, EEEE')

  const starImg = isStar
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  return (
    <li className="item-container">
      <div className="appointment-item">
        <p className="title">{title}</p>
        <button
          type="button"
          className="star-btn"
          onClick={onClickStar}
          data-testid="star"
        >
          <img src={starImg} alt="star" className="star-img" />
        </button>
      </div>
      <p className="date">Date:{formatDate}</p>
    </li>
  )
}

export default AppointmentItem
