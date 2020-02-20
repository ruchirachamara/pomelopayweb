
import React, { Component } from 'react'
import { connect } from "react-redux"

import { getTransatcions } from '../../actions'

import './home.css'

class Home extends Component {

    state = {
        toggle: false,
        activeColumn: 0,
        lastActiveColumn: 0
    }

    sortByColumn(a, colIndex, reverse) {
        if (reverse == true) {
            a.sort(sortFunction).reverse()
        } else {
            a.sort(sortFunction)
        }
      
        function sortFunction(a, b) {
            if (a[colIndex] === b[colIndex]) {
                return 0
            } else {
                return (a[colIndex] < b[colIndex]) ? -1 : 1
            }
        }
        return a
    }
    
    handleClick = (title, key) => {
        if (this.state.activeColumn === key) {
            let toggle = !this.state.toggle
            this.setState({
                toggle: toggle,
                activeColumn: key,
                rows: this.sortByColumn(this.props.transactions, title, toggle)
            })
        } else {
            this.setState({
                activeColumn: key,
                rows: this.sortByColumn(this.props.transactions, title, false)
            })
        }
    }

    componentDidMount() {
        this.props.getTransatcions()
    }
   
    render() {
        const { transactions } = this.props   
        if (!transactions) return 'loading...'             
        return (
            <>
                <h1>{'Transactions Listing'}</h1>
                <table className="responsive-table">
                    <thead>
                        <tr>
                            {(transactions && transactions[0]) && Object.keys(transactions[0]).map((title, key) => {
                            return (
                                <th 
                                    key={key} 
                                    scope="col"
                                    data-label={title} 
                                    onClick={() => this.handleClick(title, key)}                                                         
                                >
                                    {title}{(this.state.activeColumn === key) ? (this.state.toggle) ? " ↓": " ↑" : ""}
                                </th>)
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {transactions && transactions.map(function(row, key) { 
                        return (
                            <tr key={key}>
                                {Object.keys(row).map(function(entry, key) {
                                    return (
                                        <td 
                                            key={key}
                                            scope="row"                                         
                                            data-label={entry}
                                        >
                                        {row[entry]}
                                        </td> 
                                    ) 
                                })}
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </>
        )
    }   
}

function mapStateToProps(state) {
    return {
        isFetching: state.isFetching,
        transactions: state.transactions
    }
}
  
export default connect(mapStateToProps, { getTransatcions })(Home)