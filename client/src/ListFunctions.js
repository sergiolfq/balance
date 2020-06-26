import axios from 'axios'

export const getList = () => {
    return axios
        .get('/api/tasks', {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => {
            return res.data
        })
}

export const addItem = state => {
    return axios
        .post(
            '/api/tasks',
            {
                title: state.title,
                amount: state.amount,
                type: state.type
            },
            {
                headers: { 'Content-Type': 'application/json' }
            }
        )
        .then(function(response) {
            console.log(response)
        })
}

export const deleteItem = id => {
    axios
        .delete(`/api/tasks/${id}`, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(function(response) {
            console.log(response)
        })
        .catch(function(error) {
            console.log(error)
        })
}

export const updateItem = (state) => {
    return axios
        .put(
            `/api/tasks/${state.id}`,
            {
                title: state.title,
                amount: state.amount,
                type: state.type
            },
            {
                headers: { 'Content-Type': 'application/json' }
            }
        )
        .then(function(response) {
            console.log(response)
        })
}
