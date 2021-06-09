import { faEdit, faTimes, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import AddNewUser from '../AddNewUser/AddNewUser';
import Loading from '../Loading/Loading';
import './DataTable.css'

const DataTable = () => {
    const [allUser, setAllUser] = useState([])
    const [updatedUser, setUpdatedUser] = useState(null)
    const [checkedUniqueUser, setCheckedUniqueUser] = useState([])
    const [checkedUser, setCheckedUser] = useState([])
    useEffect(() => {
        fetch('https://powerful-tundra-11389.herokuapp.com/allUser')
            .then(res => res.json())
            .then(data => setAllUser(data))
    }, [])

    function deleteUser(id) {
        fetch(`https://powerful-tundra-11389.herokuapp.com/userDelete/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(result => {
                alert('User Deleted Successfully');
                window.location.reload();
            })
    }


    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '500px',
            height: '70%'
        }
    };
    var subtitle;
    const [modalIsOpen, setModalIsOpen] = useState(false);
    function openModal(userId) {
        setModalIsOpen(true);
        const updateSingleUser = allUser.find(usr => usr._id === userId)
        setUpdatedUser(updateSingleUser)

    }


    function afterOpenModal() {
        subtitle.style.color = '#283890';
    }
    function closeModal() {
        setModalIsOpen(false);
    }

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        const updatedUserData = {
            name: data.name,
            email: data.email,
            phoneNumber: data.phone,
            hobby: data.hobby,
            id: data.id
        };



        fetch("https://powerful-tundra-11389.herokuapp.com/userUpdate", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedUserData)
        })
            .then(res => res.json())
            .then(result => {
                alert('User Data Updated Successfully');
                window.location.reload();
            })
    };

    
    const handleChange =(e) =>{

            if(e.target.checked){
            const selectedUser = allUser.find(usr => usr._id === e.target.name)
            const newCheckedUser = [...checkedUser, selectedUser]
            setCheckedUser(newCheckedUser)
            if(checkedUser.length > 0){
                const uniqueUser = [...new Set(checkedUser.map(item => item))];
                setCheckedUniqueUser(uniqueUser)
            }
              }
            }

    
const handleUserData = () => {
   if(checkedUniqueUser.length){
        const url = `https://powerful-tundra-11389.herokuapp.com/email`
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(checkedUniqueUser)
        })
            .then(res => {
                alert('User Data Sent in Email Successfully');
                window.location.reload();
            })
   }
}
     

    return (
        <div className="mt-5 container">
            {(allUser.length === 0) && <Loading />}

            {(allUser.length > 0) && <div>

                <div className="row">
                    <div className="col-8">
                        <button className="btn btn-secondary fs-3 mb-3 userTable-headline text-center">Total User: [{allUser.length}]</button>
                    </div>
                    <div className="col-4">
                        <AddNewUser />
                    </div>
                </div>
                <table className="table  data-table container">
                    <thead>
                        <tr className="table-header fs-5 text-left bg-primary text-white">
                            <th scope="col">Serial No.</th>
                            <th scope="col">Name </th>
                            <th scope="col">Email </th>
                            <th scope="col">Phone </th>
                            <th scope="col">Hobbies </th>
                            <th className="text-center" scope="col">Edit </th>
                            <th className="text-center" scope="col">Delete </th>
                            <th className="text-center" scope="col">{
                                (checkedUniqueUser.length>0)?
                                <button className="btn btn-warning" onClick={handleUserData}>Send</button>:<button className="btn btn-warning">Select</button>
                            }</th>
                        </tr>
                    </thead>
                    <tbody className="userTbl-body">
                        {
                            allUser.map((user, index) =>

                                <tr className="table-data text-left border">
                                    <td>{index + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phoneNumber}</td>
                                    <td>{user.hobby}</td>
                                    <td className="text-center"><button title="Update User" className="edit-btn fs-4"><FontAwesomeIcon icon={faEdit} onClick={() => openModal(user._id)} /></button>
                                    </td>
                                    <td className="text-center"><button title="Delete User" className="delete-btn fs-4" onClick={() => deleteUser(user._id)}><FontAwesomeIcon icon={faTrashAlt} /></button></td>
                                    <td className="text-center">
                                        <input type="checkbox"
                                        name={user._id}
                                        onChange={handleChange} /></td>
                                     </tr>

                            )
                        }
                    </tbody>

                </table>

                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    // onRequestClose={closeModal}
                    onRequestClose={() => {
                        setModalIsOpen(false)
                        window.location.reload();
                    }}

                    style={customStyles}
                    contentLabel="Example Modal"
                >

                    <div className="row d-flex justify-content-end">
                        <div className="col-10">
                            <h3 className="text-primary" ref={_subtitle => (subtitle = _subtitle)}>Update User Data</h3>
                        </div>
                        <div className="col-2 ">
                            <button onClick={closeModal}><FontAwesomeIcon style={{ color: 'red', fontSize: '30px' }} icon={faTimes} /></button>
                        </div>
                    </div><hr></hr>

                    <div>
                        {updatedUser &&
                            <form onSubmit={handleSubmit(onSubmit)} autoComplete="on">
                                <div className="form-group">
                                    <label for="name" className="w-100"><h6>Edit User Name: </h6>
                                        <input defaultValue={updatedUser.name} type="text" {...register('name')} id="name" name="name" className="form-control m-2" required />
                                        {errors.name && <span className="text-danger">This field is required</span>}
                                    </label>

                                    <label for="email" className="w-100"><h6>Edit User Email: </h6>
                                        <input type="email" id="email" defaultValue={updatedUser.email}  {...register('email')} name="email" className="form-control m-2" required />
                                        {errors.email && <span className="text-danger">This field is required</span>}
                                    </label>

                                    <label for="phone" className="w-100"><h6>Edit User Phone Number: </h6>
                                        <input type="number" id="phone" defaultValue={updatedUser.phoneNumber}  {...register('phone')} name="phone" className="form-control m-2" required />
                                        {errors.phone && <span className="text-danger">This field is required</span>}
                                    </label>

                                    <label for="hobby" className="w-100"><h6>Edit User Hobbies: </h6>
                                        <input type="text" id="hobby" defaultValue={updatedUser.hobby}  {...register('hobby')} name="hobby" className="form-control m-2" required />
                                        {errors.hobby && <span className="text-danger">This field is required</span>}
                                    </label>


                                    <label for="id" className="w-100">
                                        <input type="hidden" defaultValue={updatedUser._id} id="id"  {...register('id')} name="id" className="form-control m-2" />
                                        {errors.id && <span className="text-danger">This field is required</span>}
                                    </label>

                                </div>
                                <div className="form-group text-right">
                                    <button type="submit" className="btn m-2 btn-primary fs-5">Save</button>
                                </div>
                            </form>}
                    </div>
                </Modal>

            </div>

            }


        </div>
    );
};

export default DataTable;