import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from '../actions/filters';

export class ExpenseListFilters extends React.Component {
    state = {
        calendarFocused: null
    };
    onDatesChange = ({startDate, endDate}) => {
        this.props.setStartDate(startDate);
        this.props.setEndDate(endDate);
    };
    onFocusChange = (calendarFocused) => {
        this.setState(() => ({calendarFocused}));
    };
    onTextChange = (e) => {
        this.props.setTextFilter(e.target.value);
    };
    onSortChange = (e) => {
        if (e.target.value === 'date') {
            this.props.sortByDate();
        }else if(e.target.value === 'amount') {
            this.props.sortByAmount();
        }
    };
    render() {
        return(
            <div className="content-container">
                <div className="input-group">
                    <div className="input-group__item ">
                        <input
                            type ='text'
                            className="text-input"
                            placeholder="search expenses"
                            value={this.props.filters.text} 
                            onChange={this.onTextChange }
                        />
                    </div>
                    <div className="input-group__item">
                        <select 
                            className="select"
                            value ={this.props.filters.sortBy}
                            onChange={ this.onSortChange }
                        >
                            <option value ='date'>Date</option>
                            <option value ='amount'>Amount</option>
                        </select>
                    </div>
                    <div className="input-group__item">
                        <DateRangePicker 
                            startDateId = {uuid()}
                            endDateId = {uuid()}
                            startDate = {this.props.filters.startDate}
                            endDate = {this.props.filters.endDate}
                            onDatesChange = {this.onDatesChange}
                            showClearDates = {true}
                            focusedInput = {this.state.calendarFocused}
                            onFocusChange = {this.onFocusChange}
                            numberOfMonths = {1}
                            isOutsideRange = {() => false}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    filters: state.filters
});
const mapDispatchToProps = (dispatch) => ({
    setStartDate: (date) => dispatch(setStartDate(date)),
    setEndDate: (date) => dispatch(setEndDate(date)) ,
    setTextFilter: (text) => dispatch(setTextFilter(text)),
    sortByDate: () => dispatch(sortByDate()),
    sortByAmount: () => dispatch(sortByAmount())
});

export default  connect(mapStateToProps,mapDispatchToProps)(ExpenseListFilters);