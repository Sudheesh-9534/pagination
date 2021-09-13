

class Date extends Component {
    handleSelect(ranges){
      console.log(ranges);
       {
         
      }
    }
    render(){
      const selectionRange = {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
      }
      return (
        <DateRangePicker
          ranges={[selectionRange]}
          onChange={this.handleSelect}
        />
      )
    }
  }
  export default Date