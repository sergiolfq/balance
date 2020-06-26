import React, { Component } from 'react'
import { getList, addItem, deleteItem, updateItem } from './ListFunctions'

class List extends Component {
    constructor() {
        super()
        this.state = {
            id: '',
            title: '',
            amount: 0,
            type: 1,
            arttitle: '',
            artbody: '',
            sum: 0,
            editDisabled: false,
            items: []
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    componentDidMount() {
        this.getAll()
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    getAll = () => {
        getList().then(data => {
            let dt = new Date( );
            let month = dt.getMonth();
            let sum = 0;
            data.forEach(function (elem, index){
                let date = new Date(elem.created_at);
                if(date.getMonth() == month){
                    if(elem.type === 1){
                        sum= sum + elem.amount;
                    }
                    else{
                        sum= sum - elem.amount;
                    }
                }
            })

            console.log(sum);
            this.setState(
                {
                    title: '',
                    amount: 0,
                    type: 1,
                    sum: sum,
                    items: [...data]
                },
                () => {
                    console.log(this.state.items)
                }
            )
        })
    }

    onSubmit = e => {
        e.preventDefault()
        addItem(this.state).then(() => {
            this.getAll()
        })
        this.setState({
            title: '',
            amount :0,
        })
    }

    onUpdate = e => {
        e.preventDefault()
        updateItem(this.state).then(() => {
            this.getAll()
        })
        this.setState({
            editDisabled: ''
        })
    }

    onEdit = (itemid, e) => {
        e.preventDefault()

        var data = [...this.state.items]
        data.forEach((item, index) => {
            if (item.id === itemid) {
                this.setState({
                    id: item.id,
                    title: item.title,
                    amount: item.amount,
                    type: item.type,
                    editDisabled: true
                })
            }
        })
    }

    onDelete = (val, e) => {
        e.preventDefault()
        deleteItem(val)

        var data = [...this.state.items]
        data.filter(function(item, index) {
            if (item.id === val) {
                data.splice(index, 1)
            }
            return true
        })
        this.setState({ items: [...data] })
    }

    render() {
        return (
            <div className="col-md-12">
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-12">
                                Total del mes en curso: <strong> {this.state.sum || 0} </strong>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <label htmlFor="title">Descripcion</label>
                                <input
                                    type="text"
                                    placeholder="Gastos de representación"
                                    className="form-control"
                                    id="title"
                                    name="title"
                                    value={this.state.title || ''}
                                    onChange={this.onChange.bind(this)}
                                />
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="amount">Cantidad</label>
                                <input
                                    type="number"
                                    placeholder="ej 12.000"
                                    className="form-control"
                                    id="amount"
                                    name="amount"
                                    value={this.state.amount || ''}
                                    onChange={this.onChange.bind(this)}
                                />
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="type">Tipo</label>
                                <select
                                    className="form-control"
                                    id="type"
                                    name="type"
                                    value={this.state.type }
                                    onChange={this.onChange.bind(this)}>
                                <option value="1" >Ingreso</option>
                                <option value="0">Egreso</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    {!this.state.editDisabled ? (
                        <button
                            type="submit"
                            onClick={this.onSubmit.bind(this)}
                            className="btn btn-success btn-block"
                        >
                            Agregar
                        </button>
                    ) : (
                        ''
                    )}
                    {this.state.editDisabled ? (
                        <button
                            type="submit"
                            onClick={this.onUpdate.bind(this)}
                            className="btn btn-primary btn-block"
                        >
                            Actualizar
                        </button>
                    ) : (
                        ''
                    )}
                </form>
                <table className="table">
                    <tbody>
                        {this.state.items.map((item, index) => (
                            <tr key={index}>
                                <td className="text-left"> {(item.type == 1)? '+':'-'}  {item.amount}</td>
                                <td className="text-left">{item.title}</td>
                                <td className="text-right">
                                    <button
                                        href=""
                                        className="btn btn-info mr-1"
                                        disabled={this.state.editDisabled}
                                        onClick={this.onEdit.bind(
                                            this,
                                            item.id
                                        )}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        href=""
                                        className="btn btn-danger"
                                        disabled={this.state.editDisabled}
                                        onClick={this.onDelete.bind(
                                            this,
                                            item.id
                                        )}
                                    >
                                        Borrar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default List
