import React, { Component } from 'react'
import defaultBcg from '../images/room-1.jpeg'
import Banner from '../components/Banner'
import { Link } from 'react-router-dom'
import { RoomContext } from '../context'
import StyledHero from '../components/StyledHero'

export default class SingleRoom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      slug: this.props.match.params.slug,
      defaultBcg
    }
  }

  static contextType = RoomContext

  render() {
    const { getRoom } = this.context
    const room = getRoom(this.state.slug);
    if (!room) {
      return <div className="error">
        <h3>No such room could be found</h3>
        <Link to="/rooms" className="btn-primary">
          Back to Rooms
        </Link>
      </div>
    }

    const {
      name,
      description,
      capacity,
      size,
      price,
      extras,
      breakfast,
      pets,
      images
    } = room

    const [mainImage, ...defaultImg] = images

    return (
      <>
        <StyledHero img={mainImage || this.state.defaultBcg}>
          <Banner title={`${name} room`}>
            <Link to="/rooms" className="btn-primary">
              Back to room
          </Link>
          </Banner>
        </StyledHero>
        <section className="single-room">
          <div className="single-room-images">
            {defaultImg.map((item, index) => {
              return <img key={index} src={item} alt={name} />
            })}
          </div>
          <div className="single-room-info">
            <article className="desc">
              <h3>details</h3>
              <p>{description}</p>
            </article>
            <section className="info">
              <h3>info</h3>
              <h6>price : ${price}</h6>
              <h6>size : {size}SQM</h6>
              <h6>
                max capacity : {
                  capacity > 1 ? `${capacity} people` : `${capacity} person`
                }
              </h6>
              <h6>{pets ? "pets allowed" : "no pets allowed"}</h6>
              <h6>{breakfast && "free breakfast included"}</h6>
            </section>
          </div>
          <section className="room-extras">
            <h6>extras</h6>
            <ul className="extras">
              {extras.map((item => {
                return <li key={item}> - {item}</li>
              }))}
            </ul>
          </section>
        </section>
      </>
    )
  }
}
