import {v4 as uuidv4} from 'uuid'
import {Component} from 'react'

import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    title: '',
    date: '',
    appointmentList: [],
    isStar: false,
    isFilter: false,
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {title, date, isStar} = this.state

    if (title.length !== 0 && date.length !== 0) {
      const newAppointment = {
        id: uuidv4(),
        title,
        date,
        isStar,
      }

      this.setState(prevState => ({
        appointmentList: [...prevState.appointmentList, newAppointment],
        title: '',
        date: '',
      }))
    } else {
      alert('please enter the details')
    }
  }

  onStar = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(each => {
        if (each.id === id) {
          return {...each, isStar: !each.isStar}
        }
        return each
      }),
    }))
  }

  onFilterStar = () => {
    this.setState(prevState => ({isFilter: !prevState.isFilter}))
  }

  getFilteredResults = () => {
    const {appointmentList, isFilter} = this.state
    if (isFilter) {
      return appointmentList.filter(each => each.isStar)
    }
    return appointmentList
  }

  render() {
    const {title, date, isFilter} = this.state
    const classNameStar = isFilter && 'filled-bg'
    const FilteredResults = this.getFilteredResults()

    return (
      <div className="appointment-container">
        <div className="card-container">
          <h1 className="heading">Add Appointment</h1>
          <div className="app-container">
            <form className="form-container" onSubmit={this.onSubmitForm}>
              <label htmlFor="title" className="label">
                TITLE
              </label>
              <br />
              <input
                type="text"
                id="title"
                placeholder="Title"
                className="input-element"
                onChange={this.onChangeTitle}
                value={title}
              />
              <br />
              <label htmlFor="date" className="label">
                DATE
              </label>
              <br />
              <input
                placeholder="dd/mm/yyyy"
                type="date"
                className="input-element"
                onChange={this.onChangeDate}
                value={date}
                id="date"
              />
              <br />
              <button type="submit" className="add-btn">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="img"
            />
          </div>
          <hr className="hr-line" />
          <div className="appoint-container">
            <h1 className="appoint-head">Appointments</h1>
            <button
              type="button"
              className={`${classNameStar} starred`}
              onClick={this.onFilterStar}
            >
              Starred
            </button>
          </div>
          <ul className="list-container">
            {FilteredResults.map(each => (
              <AppointmentItem each={each} key={each.id} onStar={this.onStar} />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
