import { useState, useEffect } from "react";
import { User } from "../modules/user";
import './updateUser.css'
import axios from "axios";
import "../App.css"

interface Props {
    user: User | null;
    updateUserList: () => void;
    resetUser: () => void;
}


interface FormErrors {
    [key: string]: string;
}

function UpdateUser({ user, updateUserList, resetUser }: Props) {

    
    const id = user ? user._id : '';
    const [first_name, setFirstName] = useState('');
    const [middle_name, setMiddleName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [gender, setGender] = useState('');
    const [errors, setErrors] = useState<FormErrors>({});

    useEffect(() => {
        if (user) {
            setFirstName(user.name.first_name.toString());
            setMiddleName(user.name.middle_name.toString());
            setLastName(user.name.last_name.toString());
            setEmail(user.email.toString());
            setPhoneNumber(user.phone_number.toString());
            //setGender(user.gender.toString());
        }
    }, [user]);

    const validateField = (fieldName: string, value: string) => {
        let errorMessage = '';

        switch (fieldName) {
            case 'first_name':
                errorMessage = value.trim() === '' ? 'First name is required' : '';
                break;
            case 'middle_name':
                errorMessage = value.trim() === '' ? 'Middle name is required' : '';
                break;
            case 'last_name':
                errorMessage = value.trim() === '' ? 'Last name is required' : '';
                break;
            case 'email':
                errorMessage = value.trim() === '' ? 'Email is required' : !isValidEmail(value) ? 'Invalid email format' : '';
                break;
            case 'phone_number':
                errorMessage = value.trim() === '' ? 'Phone number is required' : !isValidPhoneNumber(value) ? 'Invalid phone number format' : '';
                break;
            default:
                break;
        }

        setErrors(prevErrors => ({
            ...prevErrors,
            [fieldName]: errorMessage
        }));
    };

    const isValidEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const isValidPhoneNumber = (phoneNumber: string) => {
        return /^(?:\+?\d{1,3}\s*)?\d(?:[\s-]*\d){8,12}$/.test(phoneNumber);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isFormValid = validateForm();
        if (isFormValid) {
            const user: User = {
                name: {
                    first_name: first_name,
                    middle_name: middle_name,
                    last_name: last_name,
                },
                email: email,
                phone_number: phone_number,
                //gender: gender
            };
            axios.put("http://localhost:3000/user/" + id, user)
                .then(result => {
                    console.log(result);
                    updateUserList();
                    alert('Update successful!');
                    resetUser();
                })
                .catch(err => console.error(err));
        }
    };

    const validateForm = () => {
        let isValid = true;

        validateField('first_name', first_name);
        validateField('middle_name', middle_name);
        validateField('last_name', last_name);
        validateField('email', email);
        validateField('phone_number', phone_number);

        for (const error in errors) {
            if (errors[error] !== '') {
                isValid = false;
                break;
            }
        }

        return isValid;
    };

    return (
        <div className="component">
            <h2>Update User Component</h2>
            <div className="user-details">
                {user ? (
                    <div>
                        <form onSubmit={handleSubmit} >
                            <h2>User Details:</h2>
                            <div>
                                <label>First Name</label>
                                <input type="text" value={first_name} onChange={(e) => { setFirstName(e.target.value); validateField('first_name', e.target.value); }} />
                                {errors.first_name && <span style={{ color: 'red' }}>{errors.first_name}</span>}
                            </div>
                            <div>
                                <label>Middle Name</label>
                                <input type="text" value={middle_name} onChange={(e) => { setMiddleName(e.target.value); validateField('middle_name', e.target.value); }} />
                                {errors.middle_name && <span style={{ color: 'red' }}>{errors.middle_name}</span>}
                            </div>
                            <div>
                                <label>Last Name</label>
                                <input type="text" value={last_name} onChange={(e) => { setLastName(e.target.value); validateField('last_name', e.target.value); }} />
                                {errors.last_name && <span style={{ color: 'red' }}>{errors.last_name}</span>}
                            </div>
                            <div>
                                <label>Email</label>
                                <input type="text" value={email} onChange={(e) => { setEmail(e.target.value); validateField('email', e.target.value); }} />
                                {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
                            </div>
                            <div>
                                <label>Phone Number</label>
                                <input type="text" value={phone_number} onChange={(e) => { setPhoneNumber(e.target.value); validateField('phone_number', e.target.value) }} />
                                {errors.phone_number && <span style={{ color: 'red' }}>{errors.phone_number}</span>}
                            </div>
                            
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                ) : (
                    <p>Please select a user from the table.</p>
                )}
            </div>
        </div>
    );
}

export default UpdateUser;