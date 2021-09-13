import React, { Component } from 'react';
// import 'bootstrap/dist/css/bootstrap.css';
import $ from "jquery"
import Pagination from "react-js-pagination";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import report  from '../axios';

export default class Reports extends Component {
  constructor(props) {
      super(props);
      this.state = {
      activePage: 1,
      search: '',
      startDate: '',
      endDate: '',
      reportDetails: [],
      storeData: [],
      orderTotalSum: 0,
      orderCountSum: 0,
      orderCount: 0,
      isData: 0
    };

    this.searchValueOnChange = this.searchValueOnChange.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeTo = this.handleChangeTo.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    })
  }

  handleChangeTo(dateTo) {
    this.setState({
      endDate: dateTo

    })

  }



  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
    var offset;
    var max;
    if (pageNumber === "1") {
      offset = "0";
      max = "10";
      this.setState({
        activePage: pageNumber,
        isLoading: '0'
      })
    }

    else {

      offset = parseInt(pageNumber - 1) * 10;
      max = "10";
      this.setState({
        activePage: pageNumber,
        isLoading: '0'
      })
    }

    var cancelDeliverOrderToDate = $("#cancelDeliverOrderToDate").val()
    var cancelDeliverOrderFromDate = $("#cancelDeliverOrderFromDate").val()
    var cancelDeliverOrderOrderStatusId = $("#cancelDeliverOrderOrderStatusId").val()

                                    
    var postData = {                                                                                                                                       
      "functionName": "cancelledOrDeliveredOrder",                                    
      "sellerId": "9680",                               
      "storeId": "262",
      "cancelDeliverOrderOrderStatusId": cancelDeliverOrderOrderStatusId,
      "cancelDeliverOrderFromDate": cancelDeliverOrderFromDate,
      "cancelDeliverOrderToDate": cancelDeliverOrderToDate,
      "cancelDeliverOrderOffset": offset,
      "cancelDeliverOrderMax": max
    }
    console.log("rrrrrrrrrrrrrrrrr",postData)
    report(postData).then((data) => {
      console.log("ssssssssssssssssssss",data)
      if (data.data.success === '1') {
        this.setState({
            divPagination: '1',
            reportDetails: data.data.result.orderResult,
            storeData: data.data.result.storeResult,
            orderCount: data.data.result.totalCount,
            orderTotalSum: data.data.result.orderTotalSum,
            orderCountSum: data.data.result.orderCountSum
        });
      }
    });
  }

  listing() {

    let cancelDeliverOrderToDate = document.getElementById("cancelDeliverOrderToDate").value
    let cancelDeliverOrderFromDate = document.getElementById("cancelDeliverOrderFromDate").value
    let cancelDeliverOrderOrderStatusId = document.getElementById("cancelDeliverOrderOrderStatusId").value
    
    
    const postData = {

      "functionName": "cancelledOrDeliveredOrder",
      "sellerId": "9680",
      "storeId": "262",
      "cancelDeliverOrderOrderStatusId": cancelDeliverOrderOrderStatusId,
      "cancelDeliverOrderFromDate": cancelDeliverOrderFromDate,
      "cancelDeliverOrderToDate": cancelDeliverOrderToDate,
      "cancelDeliverOrderOffset": offset,
      "cancelDeliverOrderMax": "10"
    }

    console.log("ppppppppppp",postData)
    report(postData).then((data) => {

      if (data.data.success === "1") {
        this.setState({
          reportDetails: data.data.result.orderResult,
          storeData: data.data.result.storeResult,
          orderCount: data.data.result.totalCount,
          orderTotalSum: data.data.result.orderTotalSum,
          orderCountSum: data.data.result.orderCountSum,
          isData: 1
        });
      }
      else{
        this.setState({
          reportDetails: [],
            isData: 1
        }); 
      }

    })
  }
    componentDidMount() {
    $("#reportsMenuId").addClass("topMenuActive");
    $(".cancelOrdrCls").addClass("sideLeftSecAct");
    $("#reportsMenuId").addClass("topMenuActive");
    $("#orderm-table-list tr").click(function () {
    $("#orderm-table-list tr").removeClass("orderm-table-tr-active");
    $(this).addClass("orderm-table-tr-active");
    });


    this.listing()
    }

  searchValueOnChange = (event) => {
    var cancelDeliverOrderToDate = $("#cancelDeliverOrderToDate").val()
    var cancelDeliverOrderFromDate = $("#cancelDeliverOrderFromDate").val()
    var cancelDeliverOrderOrderStatusId = $("#cancelDeliverOrderOrderStatusId").val()
    

      if(cancelDeliverOrderToDate !== "" && cancelDeliverOrderFromDate !==""){
      if (cancelDeliverOrderFromDate > cancelDeliverOrderToDate)
      {
      alert("To date should be greater than or equal to from date")
      $("#cancelDeliverOrderToDate").focus()
      return false
      }
    }


this.setState({
  isData: 0
});
    const postData = {
      "functionName": "cancelledOrDeliveredOrder",
      "sellerId": "9680",
      "storeId": "262",
      "cancelDeliverOrderOrderStatusId": cancelDeliverOrderOrderStatusId,
      "cancelDeliverOrderFromDate": cancelDeliverOrderFromDate,
      "cancelDeliverOrderToDate": cancelDeliverOrderToDate,
      "cancelDeliverOrderOffset": "0",
      "cancelDeliverOrderMax": "10"
    }
    console.log("hhhhhhhhhhhhh", postData)
    report(postData).then((data) => {
      if (data.data.success === "0") {
        console.log(data.data.errorMessage)
        this.setState({
          reportDetails: [],
          isData: 0
        });
      }
      if (data.data.success === "1") {
        this.setState({
          reportDetails: data.data.result.orderResult,
          storeData: data.data.result.storeResult,
          orderCount: data.data.result.totalCount,
          orderTotalSum: data.data.result.orderTotalSum,
          orderCountSum: data.data.result.orderCountSum,
          activePage: 1,
          isData: 1
        });
      }
    })
}

  render() {
    return (
      <div className="coverWraper orderm-coverWraper orderm-coverWraper-sidemenu">
        <title>Cancelled/Delivered Order</title>   
        <div className="contentWrap bg-white">  
          <div className="container-fluid orderm-right-section">
            <h3 className="mb-0">Cancelled/Delivered Order</h3>
            <div className="row orderm-search-wrapper">
              <div className="col-md-2">             

                <DatePicker
                  selected={this.state.startDate}
                  onChange={this.handleChange} className="orderm-field" dateFormat="yyyy/MM/dd" id="cancelDeliverOrderFromDate" name="cancelDeliverOrderFromDate" placeholderText="Order From"
                />
              </div>
              <div className="col-md-2">
          
        <DatePicker
             selected={this.state.endDate}
             onChange={this.handleChangeTo} dateFormat="yyyy/MM/dd" className="orderm-field" id="cancelDeliverOrderToDate" placeholderText="Order To"
                />
              </div>
              <div className="col-md-2">
                <select className="orderm-field" id="cancelDeliverOrderOrderStatusId" name="cancelDeliverOrderOrderStatusId">
                  <option value="0">Status</option>
                  <option value="4">Delivered </option>
                  <option value="5">Cancelled</option>
                </select>
              </div>
              <div className="col-md-1">
                <span className="commonButton" onClick={() => this.searchValueOnChange()}>Search</span>
              </div>
            </div>
           <div className="orderm-bordertop"></div><br></br>
            {this.state.reportDetails.length > 0 ?
              <div className="col-md-12 p-0">
                <h3 className="mb-0">Total Cancelled & Delivered Amount = {this.state.orderTotalSum}</h3>
                <h3 className="mb-0">Total Cancelled & Delivered Order = {this.state.orderCountSum}</h3>
                <div className="dashboardTableMain orderm-table" id="orderm-table-list">
                  <table className="table table-bordered">
                    <thead>
                      <th>Sale Month</th>
                      <th>Store Name</th>
                      <th>Status</th>
                      <th>Number of Orders</th>
                      <th>Amount</th>
                    </thead>
                    <tbody>
                      {this.state.reportDetails.map((reportDetails, i) => (
                        <tr>
                          <td>{reportDetails.saleDate}</td>
                          <td>{reportDetails.storeName}</td>
                          <td>{reportDetails.statusName}</td>
                          <td>{reportDetails.orderCount}</td>
                          <td>{reportDetails.orderTotal}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                { this.state.orderCount > 10 ?
                <div className="paginationSection orderm-paginationSection">
                  <Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={1}
                    totalItemsCount={this.state.orderCount}
                    pageRangeDisplayed={10}
                    onChange={this.handlePageChange}
                      />
                </div>
                : ''}
              </div>
             : this.state.isData === 1 ? <tbody><tr class='text-danger text-center'><td colspan="7">No data Found</td> </tr></tbody> : ""}
         </div>
         </div>
          </div>
           )
          }
         }