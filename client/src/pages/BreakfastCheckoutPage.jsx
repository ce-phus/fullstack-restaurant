import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getBreakfastDetails } from '../actions/breakfastActions';
import { ChargeMpesaComponent } from '../components';
import { Link, useParams } from 'react-router-dom'
import { UserAddressComponent } from '../components';

const BreakfastCheckoutPage = () => {

  const router = useNavigate()
  const {id} = useParams()

  const dispatch = useDispatch()
  const [addressSelected, setAddressSelected] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(0);

  const createMpesaReducer = useSelector(state => state.mpesaStkPushReducer);
  const { error: mpesaCreationError, success, loading: mpesaCreationLoading } = createMpesaReducer;

  const breakfastDetailReducer = useSelector(state=> state.breakfastDetailReducer);
  const { loading, error, breakfast } = breakfastDetailReducer

  const baseUrl = 'http://localhost:8000';
  const fullImageUrl = baseUrl + breakfast.image;

  const handleAddressId = (id) => {
      if (id) {
        setAddressSelected(true);
      }
      setSelectedAddressId(id);
  }

  useEffect(() => {
    if (id) {
        dispatch(getBreakfastDetails(id));
    }
  }, [dispatch, id]);
  return (
    <div className="container mx-auto px-4 py-10 text-light mt-10">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
                <div className="p-4 mb-8 rounded-lg bg-gray-800">
                    <h3 className="text-3xl md:text-6xl font-bold mb-6">Checkout Summary</h3>
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <Message variant="danger">{error}</Message>
                    ) : (
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="mt-4 md:mt-0">
                                <p className="font-semibold text-xl md:text-3xl text-gray-400">{breakfast.name}</p>
                                <hr className="my-4 border-gray-700" />
                                <p className="text-gray-500 text-lg">{breakfast.description}</p>
                                <p className="text-accent mt-6">
                                    Price: <span className="text-light ml-2">Ksh {breakfast.price}</span>
                                </p>
                            </div>
                            <div className="relative">
                                <img src={fullImageUrl} alt={breakfast.name} width={550} height={500} className="rounded-lg" />
                            </div>
                        </div>
                    )}

                    <h3 className="text-3xl md:text-6xl font-bold mt-10 mb-4 flex">Billing Address</h3>
                    <Link to="/all-addresses/" className="cursor-pointer font-semibold hover:text-accent">
                        Edit/Add Address
                    </Link>
                    <UserAddressComponent handleAddressId={handleAddressId} />
                </div>

                <div className="p-4 mb-8 rounded-lg bg-gray-800">
                    <h3 className="text-3xl md:text-6xl font-bold mb-4">Payments Section</h3>
                    <ChargeMpesaComponent
                        selectedAddressId={selectedAddressId}
                        addressSelected={addressSelected}
                        id={id}
                        itemPrice={breakfast.price}
                        item={breakfast}
                        itemType="breakfast" 
                    />
                </div>
            </div>
        </div>
  )
}

export default BreakfastCheckoutPage