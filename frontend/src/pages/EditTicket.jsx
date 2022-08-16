import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getTicket, updateTicket } from '../features/tickets/ticketSlice'
import BackButton from '../components/BackButton'

function EditTicket() {
  const { user } = useSelector((state) => state.auth)
  const { ticket } = useSelector((state) => state.tickets)
  const { ticketId } = useParams()

  const [name] = useState(user.name)
  const [email] = useState(user.email)
  const [product, setProduct] = useState('iPhone')
  const [description, setDescription] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getTicket(ticketId))
      .unwrap()
      .then((ticket) => {
        setProduct(ticket.product)
        setDescription(ticket.description)
      })
      .catch(toast.error)
  }, [dispatch, ticketId])

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(updateTicket({ ...ticket, product, description }))
      .unwrap()
      .then(() => {
        // We got a good response so navigate the user
        navigate(`/ticket/${ticket._id}`)
        toast.success('Ticket updated!')
      })
      .catch(toast.error)
  }

  return (
    <>
      <BackButton />
      <section className='heading'>
        <h1>Create New Ticket</h1>
        <p>Please fill out the form below</p>
      </section>

      <section className='form'>
        <div className='form-group'>
          <label htmlFor='name'>Customer Name</label>
          <input type='text' className='form-control' value={name} disabled />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Customer Email</label>
          <input type='text' className='form-control' value={email} disabled />
        </div>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor='product'>Product</label>
            <select
              name='product'
              id='product'
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              <option value='iPhone'>iPhone</option>
              <option value='Macbook Pro'>Macbook Pro</option>
              <option value='iMac'>iMac</option>
              <option value='iPad'>iPad</option>
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='description'>Description of the issue</label>
            <textarea
              name='description'
              id='description'
              className='form-control'
              placeholder='Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className='form-group'>
            <button className='btn btn-block'>Update Ticket</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default EditTicket
