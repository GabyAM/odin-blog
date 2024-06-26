export function fetchUser(id, token) {
    const options = {};
    if (token) {
        options.credentials = 'include';
        options.headers = {
            Authorization: `bearer ${token}`
        };
    }
    return fetch(`http://localhost:3000/user/${id}`, options).then((res) => {
        if (!res.ok) {
            throw new Error('');
        }
        return res.json();
    });
}

export function submitUserEdit(formData, id, token) {
    return fetch(`http://localhost:3000/user/${id}/update`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            Authorization: `bearer ${token}`
        },
        body: formData
    }).then((res) => {
        if (!res.ok) {
            throw new Error('');
        }
        return res.json();
    });
}

export function submitUserCreate(formData, token) {
    return fetch(`http://localhost:3000/user`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            Authorization: `bearer ${token}`
        },
        body: formData
    }).then((res) => {
        if (!res.ok) {
            throw new Error('');
        }
        return res.json();
    });
}
