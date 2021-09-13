import React,{Component} from 'react';
import "bootstrap/dist/css/bootstrap.css"
import report from'./axios.js'
/*import Example from './date';
import Paging from './pagination.js';*/
import Pagination from "react-js-pagination";
import './App.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


class Seller extends Component{

      constructor(props){ 
        super(props);  
        this.state={
         reportDetails:[],
         activePage:1,
         orderTotalSum: 0,
         orderCountSum: 0,
         orderCount: 0,
         storeData:[],
         isData: 0,
         startDate:"",
         endDate:""
        }
        this.handlePageChange = this.handlePageChange.bind(this);
        this.searchValueOnChange = this.searchValueOnChange.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.handleChangeEnd=this.handleChangeEnd.bind(this);
      }
      
// all
componentDidMount(){
    const service={
      "cancelDeliverOrderFromDate": "",
      "cancelDeliverOrderMax": 10,
      "cancelDeliverOrderOffset":0,
      "cancelDeliverOrderOrderStatusId":0,
      "cancelDeliverOrderToDate": "",
      "functionName": "cancelledOrDeliveredOrder",
      "sellerId": 9680,
      "storeId": 262
};
      console.log("hello",service);
        report(service).then((data)=>{
              this.setState({
                    reportDetails:data.data.result.orderResult,
                    orderCount: data.data.result.totalCount,
                    orderTotalSum: data.data.result.orderTotalSum,
                    orderCountSum: data.data.result.orderCountSum});
                    console.log("aaa",data.data.result)
      }
    );
}
 handleChange(date){
  this.setState({
    startDate:date
  })
  console.log("start", date)
 };
  
 handleChangeEnd(dateTo){
   this.setState({
     endDate:dateTo
   })
 }
//  Pagination

handlePageChange(pageNumber){
  console.log('calling this')
  console.log(`active page is${pageNumber}`)
  this.setState({activePage: pageNumber}); 
  var offset
  var max
  if (pageNumber === "1") {
    this.setState({
      activePage: pageNumber,
      isLoading: '0',
      offset : "0",
      max :"10"
    })
  }

  else {
    offset = parseInt(pageNumber - 1) * 10;
    console.log('........',offset);
    max = "10";
    this.setState({
    activePage: pageNumber,
    isLoading: '0'
    })
  }

  const service={
    "cancelDeliverOrderFromDate": "",
    "cancelDeliverOrderMax":max,
    "cancelDeliverOrderOffset":offset,
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
//  search

  }
  searchValueOnChange(){
    let cancelDeliverOrderToDate = document.getElementById("cancelDeliverOrderToDate").value
    let cancelDeliverOrderFromDate = document.getElementById("cancelDeliverOrderFromDate").value
    let cancelDeliverOrderOrderStatusId = document.getElementById("cancelDeliverOrderOrderStatusId").value
    // var offset
    // var max
    
    if(cancelDeliverOrderToDate !== "" && cancelDeliverOrderFromDate !==""){
      if (cancelDeliverOrderFromDate >=cancelDeliverOrderToDate)
      {
      alert("To date should be greater than or equal to from date")
      document.getElementById("cancelDeliverOrderToDate")
      console.log("todate",cancelDeliverOrderToDate)
      console.log("fromdate",cancelDeliverOrderFromDate)
      
      return false
      
      }
        this.setState({
          isData:0
        })
        const service={
          "cancelDeliverOrderFromDate": cancelDeliverOrderFromDate,
          "cancelDeliverOrderMax": 5,
          "cancelDeliverOrderOffset":0,
          "cancelDeliverOrderOrderStatusId":cancelDeliverOrderOrderStatusId,
          "cancelDeliverOrderToDate": cancelDeliverOrderToDate,
          "functionName": "cancelledOrDeliveredOrder",
          "sellerId": 9680,
          "storeId": 262
    };
    console.log("date", service)
    report(service).then((data) => {
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
   
  }
   
  
render(){
  return(
   <div >
     { <div className="mainHead">
     <a href="https://www.myyshopp.com/">  <img src="https://media-exp1.licdn.com/dms/image/C510BAQH96cntrM2zqQ/company-logo_200_200/0/1536154094999?e=2159024400&v=beta&t=de0GYVM8wwe3h83N8ZQjBp8ImYm7bj0t_UTU7OaKfE0" className="githubIcon" alt="MyyShopp" width="120" height="70"/>
</a>


 <div className="about"> 
<a href="https://www.myyshopp.com/buyer/aboutUs"> About Us</a>
 </div>  

<div className="contact"> 
<a href="https://www.myyshopp.com/buyer/contactUs"> Contact Us</a>
 </div>
 
</div> }

     < div className="header">
       {/* head */}
     {/* <h1 >MyyShopp</h1>   */}
     
     {/* datepicker */}
      <div className="fromDate">
            <DatePicker selected={this.state.startDate} onChange={this.handleChange} className="orderm-field" dateFormat="yyyy/MM/dd" id="cancelDeliverOrderFromDate" name="cancelDeliverOrderFromDate" placeholderText="Order From"
                 />
    </div>
    
   <div className="toDate">
     
     <DatePicker selected={this.state.endDate} onChange={this.handleChangeEnd} className="orderm-field" dateFormat="yyyy/MM/dd" id="cancelDeliverOrderToDate" name="cancelDeliverOrderToDate" placeholderText="Order To"
                   />
    </div>
    
    {/* searchbuttom */}
    <div className="search">
                <button className="commonButton" onClick={() => this.searchValueOnChange()}>Search</button>
              </div>  
              {/* Status */}
              <div className="status">
                <select className="statusId" id="cancelDeliverOrderOrderStatusId" name="cancelDeliverOrderOrderStatusId">
                  <option value="0">Status</option>
                  <option value="4">Delivered </option>
                  <option value="5">Cancelled</option>
                </select>
              </div>
{/* total count */}
    <h3 className="total">Total Cancelled & Delivered Amount = {this.state.orderTotalSum}</h3>
                <h3 className="total">Total Cancelled & Delivered Order = {this.state.orderCountSum}</h3>
  
                </div>
     {/* table */}
               <table className="table table-bordered">

                    <thead>

                      <th>Sale Month</th>
                      <th>Store Name</th>
                      <th>Status</th>
                      <th>Number of Orders</th>
                      <th>Amount</th>

                    </thead>

                    <tbody>

                     {this.state.reportDetails.map((itm, K) => (

                        <tr>

                          <td>{itm.saleDate}</td>
                          <td>{itm.storeName}</td>
                          <td>{itm.statusName}</td>
                          <td>{itm.orderCount}</td>
                          <td>{itm.orderTotal}</td>

                        </tr>

                      ))}

                    </tbody>
                  
                  </table>
                  <div>
      {/* pagination */}
         <div className="pagination">
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={10}
          totalItemsCount={this.state.orderCount}
          pageRangeDisplayed={5}  
          onChange={this.handlePageChange.bind(this)}
        />
      </div> 
   </div>
</div>

 )
}
}
      
export default Seller


