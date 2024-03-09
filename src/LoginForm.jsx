import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ErrorIcon } from './Icons';
import { useState } from 'react';
import { useAuth } from './hooks/useAuth';

export function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const { updateToken } = useAuth();
    const [serverErrors, setServerErrors] = useState(null);
    const navigate = useNavigate();
    async function onSubmit(formData) {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
            credentials: 'include'
        });
        const jsonResponse = await response.json();
        if (!response.ok) {
            if (!jsonResponse.errors) {
                throw new Error('Something went wrong while fetching data');
            }
            setServerErrors(jsonResponse.errors);
        } else {
            setServerErrors(null);
            updateToken(jsonResponse.accessToken);
            navigate('/posts');
        }
    }

    function getFormErrors(clientErrors, serverErrors) {
        const mappedClientErrors = {};
        Object.keys(clientErrors).forEach((key) => {
            mappedClientErrors[key] = clientErrors[key].message;
        });
        return Object.assign(mappedClientErrors, serverErrors);
    }
    const formErrors = getFormErrors(errors, serverErrors);

    function handleInputChange(e) {
        const { name } = e.target;

        if (serverErrors[name]) {
            const newErrors = { ...serverErrors };
            delete newErrors[name];
            setServerErrors(newErrors);
        }
    }

    return (
        <>
            <form
                className="user-form flex-col"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="fields-container flex-col">
                    <label className="flex-col">
                        Email
                        <div
                            className={`form-input-container ${
                                formErrors.email ? 'error' : ''
                            }`}
                        >
                            <input
                                className="form-input"
                                type="text"
                                name="email"
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        message:
                                            'Email must be in the correct format'
                                    }
                                })}
                                onChange={handleInputChange}
                            />
                        </div>
                        {formErrors.email && (
                            <span className="form-error flex-row">
                                <ErrorIcon width={16} height={16}></ErrorIcon>
                                <span>{formErrors.email}</span>
                            </span>
                        )}
                    </label>
                    <label className="flex-col">
                        Password
                        <div
                            className={`form-input-container ${
                                formErrors.password ? 'error' : ''
                            }`}
                        >
                            <input
                                className="form-input"
                                type="password"
                                name="password"
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 8,
                                        message:
                                            'Password must have at least 8 characters'
                                    }
                                })}
                                onChange={handleInputChange}
                            />
                        </div>
                        {formErrors.password && (
                            <span className="form-error flex-row">
                                <ErrorIcon width={16} height={16}></ErrorIcon>
                                <span>{formErrors.password}</span>
                            </span>
                        )}
                    </label>
                </div>
                <button>Log in</button>
            </form>
        </>
    );
}
