import React, { useState } from 'react';
import Modal from 'react-modal';
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const AddNewUser = () => {
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
    const [modalIsOpen, setIsOpen] = useState(false);
    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        subtitle.style.color = 'white';
    }

    function closeModal() {
        setIsOpen(false);
    }




    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        const userData = {
            name: data.name,
            email: data.email,
            phoneNumber: data.phone,
            hobby: data.hobby

        };

        
        const url = `https://powerful-tundra-11389.herokuapp.com/addUser`
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
            .then(res => {
                alert('User Added Successfully');
                window.location.reload();
            })
    };
    return (
        <div className="mb-3" >
            <div className="text-center">
            <div>
                <button onClick={openModal} className="btn btn-info fs-3 mb-3 userTable-headline text-center"><h4 ref={_subtitle => (subtitle = _subtitle)}>Add New User</h4></button>
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >

                    <div className="row d-flex justify-content-end">
                        <div className="col-10">
                            <h1 className="text-primary"> Add New User</h1>
                        </div>
                        <div className="col-2 ">
                            <button onClick={closeModal}><FontAwesomeIcon style={{ color: 'red', fontSize: '30px' }} icon={faTimes} /></button>
                        </div>
                    </div><hr></hr>

                    <div>
                        <form onSubmit={handleSubmit(onSubmit)} autoComplete="on">
                            <div className="form-group">
                                <label for="name" className="w-100"><h6>Input New User Name: </h6>
                                <input type="text" {...register('name')} id="name" name="name" placeholder="Mike Pops" className="form-control m-2" required/>
                                {errors.name && <span className="text-danger">This field is required</span>}
                                </label>
                                
                                <label for="email" className="w-100"><h6>Input New User Email: </h6>
                                <input type="email" id="email"  {...register('email')} name="email" placeholder="mikepops02@gmail.com" className="form-control m-2" required/>
                                {errors.email && <span className="text-danger">This field is required</span>}
                                </label>

                                <label for="phone" className="w-100"><h6>Input New User Phone No: </h6>
                                <input type="number" id="phone"  {...register('phone')} name="phone" placeholder="22349273" className="form-control m-2" required/>
                                {errors.phone && <span className="text-danger">This field is required</span>}
                                </label>

                                <label for="hobby" className="w-100"><h6>Input New User Hobbies: </h6>
                                <input type="text" id="hobby"  {...register('hobby')} name="hobby" placeholder="Swimming" className="form-control m-2" required/>
                                {errors.hobby && <span className="text-danger">This field is required</span>}
                                </label>
                
                               </div>
                            <div className="form-group text-right">
                                <button type="submit" className="btn m-2 btn-primary fs-5">Submit</button>
                            </div>
                        </form>
                    </div>
                </Modal>
            </div>
        </div>
        </div>
    );
};

export default AddNewUser;