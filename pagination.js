import React, { Component } from "react";
import Pagination from "react-js-pagination";
import report from "./axios";
import "bootstrap/dist/css/bootstrap.min.css"

 
class Paging extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sellerList:[],
      activePage:1,
      orderTotalSum: 0,
      orderCountSum: 0,
      orderCount: 0,
      storeData:[],
      isData: 0
    };
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handlePageChange(pageNumber){
  this.setState({activePage: pageNumber}); 
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
    const service={
      "cancelDeliverOrderFromDate": "",
      "cancelDeliverOrderMax": 10,
      "cancelDeliverOrderOffset":0,
      "cancelDeliverOrderOrderStatusId":0,
      "cancelDeliverOrderToDate": "", 
      "functionName": "cancelledOrDeliveredOrder",
      "sellerId": 9680,
      "storeId": 262};
      console.log("page",service)
      report(service).then((data) => {
        if (data.data.success === "1") {
          console.log(data.data.successMessage)
          this.setState({
            reportDetails: data.data.result.orderResult,
            orderCount: data.data.result.totalCount,
          
          /*activePage: 20,
           isData:1*/
        

          
        });
      }
    })
  
    }
  render() 
  {
    return (
      <div>
     
        <div className="page">
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={6}
          totalItemsCount={this.state.orderCount}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange.bind(this)}
        />
      </div>
      
      </div>
    );
  }

}
export default Paging