<template>
    <div class="container-fluid">

        <h3> <b style="color:green;">Processed Card Details</b></h3>
        <hr>

    <!-- //search form  -->
    <b-form @submit="searchData">
        <b-row class="my-1" >
            <b-col sm="1">
                <label>Reference Id :</label>
            </b-col>
            <b-col sm="2">
                <b-form-input v-model="reference_id_search" type="text" placeholder="Enter Reference Id"  />
            </b-col>
            <b-col sm="1">
                <label>Last Charged date :</label>
            </b-col>
            <b-col sm="2">
                <datetime v-model="charging_date_search" class="theme-orange"></datetime>
            </b-col>
            <b-col sm="1">
                <label>Status:</label>
            </b-col>
            <b-col sm="2">
                <b-form-select v-model="status_search"  :options="options" />
            </b-col>
            <b-col sm="1">
                <label>Unique User Id :</label>
            </b-col>
            <b-col sm="2">
                <b-form-input v-model="unique_id_search" type="text" placeholder="Enter Unique User Id"  />
            </b-col>
        </b-row>

        <b-row class="my-1" >
            <b-col sm="1">
                <label>Registered Name :</label>
            </b-col>
            <b-col sm="2">
                <b-form-input  v-model="registered_name_search" type="text" placeholder="Enter Registered name"  />
            </b-col>
            <b-col sm="1">
                <label>Email :</label>
            </b-col>
            <b-col sm="2">
                <b-form-input v-model="email_search" type="email" placeholder="Enter Email"  />
            </b-col>
            <b-col sm="1">
                <label>Mobile Number :</label>
            </b-col>
            <b-col sm="2">
                <b-form-input v-model="mobile_search" type="text" placeholder="Enter Mobile Number"  />
            </b-col>
            <b-col sm="1">
                <label>Decription :</label>
            </b-col>
            <b-col sm="2">
                <b-form-input v-model="description_search" type="text" placeholder="Enter Description"  />
            </b-col>
             <b-col sm="1">
                <label>Card Number :</label>
            </b-col>
            <b-col sm="2">
                <b-form-input v-model="card_number_search" type="text" placeholder="Enter card number"  />
            </b-col>
      </b-row>
         <b-button type="submit" variant="success">Search</b-button>
           <download-excel class = "pull-right export" :data = "processData" :fields = "json_fields" type = "csv" name = "filename.xls">
        <b-button class="btn btn-info pull-left">Export</b-button></download-excel>
    </b-form>
     <!-- //search form close -->
    &nbsp;&nbsp;
        <table class="table fluid table-hover">
          <thead class="thead-light">
            <tr>
              <th>#</th>
              <th>Merchant ID</th>
              <th >Merchnat Name</th>
              <th>Reference Id</th>
              <th>Unique User Id</th>
              <th>Registered Name</th>
              <th>Email</th>
              <th>Mobile No</th>
              <th>Description</th>
              <th>Last Charged Date</th>
              <th>Card Number</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data, index) in sortedrecurringProcessData">
                <td>{{index+1}}</td>
                <td>{{ data['merchant_id'] }}</td>
                <td>{{ data['merchant_name'] }}</td>
                <td>{{ data['reference_id'] }}</td>
                <td>{{ data['unique_id'] }}</td>
                <td>{{ data['registered_name'] }}</td>
                <td>{{ data['email'] }}</td>
                <td>{{ data['mobile'] }}</td>
                <td>{{ data['description'] }}</td>
                <td>{{getDate(data['charging_date']) }}</td>
                <td>{{ data['card_number'] }}</td>
                <td>{{ data['amount'] }}</td>
                <td>{{ data['status'] }}</td>
                <td>{{ data['remarks'] }}</td>
            </tr>
            <tr v-if="(sortedrecurringProcessData == '')" >
                <td v-bind:style="{backgroundColor : bgcolor, textAlign : alignment }" colspan="14">No Records to show </td>
            </tr>
          </tbody>
        </table>
            <div class="mt-3 text-right">
              <b-pagination align="right" :total-rows="totalRows" v-model="currentPage" :per-page="pageSize" />
            </div>
    </div>
</template>
<style>
.pull-right {
    float: left !important;
}
.export {
    padding-bottom: 15px;
    padding-right: 5px;
}
.tablelayout {
    table-layout: fixed;
    width: 100%;
}
.btn-success{
    background-color: #26b99a;
}
.vdatetime-input {
    display: block;
    width: 100%;
    height: calc(1.5em + .75rem + 2px);
    padding: .375rem .75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}
.theme-orange .vdatetime-popup__header,
.theme-orange .vdatetime-calendar__month__day--selected > span > span,
.theme-orange .vdatetime-calendar__month__day--selected:hover > span > span {
  background: #FF9800;
}

.theme-orange .vdatetime-year-picker__item--selected,
.theme-orange .vdatetime-time-picker__item--selected,
.theme-orange .vdatetime-popup__actions__button {
  color: #ff9800;
}
</style>

<script>
import moment from 'moment';
import { Datetime } from 'vue-datetime';
export default {

    data() {
      return {
        processData : [ ],
        recurringProcessData : [],
        pageSize : 10,
        currentPage : 1,
        totalRows : '',
        reference_id_search: '',
        charging_date_search : '',
        status_search : '',
        unique_id_search : '',
        registered_name_search : '',
        email_search : '',
        mobile_search : '',
        description_search : '',
        card_number_search : '',
        options: [
          { value: '', text: 'Select' },
          { value: '1', text: 'Processed' },
          { value: '0', text: 'Pending' }
        ],
        bgcolor : 'grey',
        alignment : 'center',
        url : 'http://localhost/cc-gw/public/v1/recurring/recurringprocessdata/'+this.$route.params.id,
        json_fields: {
                    'Merchant ID' : 'merchant_id',
                    'Merchant Name' : 'merchant_name',
                    'Reference Id' : 'reference_id',
                    'Unique User Id' : 'unique_id',
                    'Registered Name' : 'registered_name',
                    'Email' : 'email',
                    'Mobile No' : 'mobile',
                    'Description' : 'description',
                    'Charging Date' : 'charging_date',
                    'Card Number' : 'card_number',
                    'Amount':  'amount',
                    'Status' : 'status',
                    'Remarks' : 'remarks',
        },
        json_data: [ ],
        json_meta: [
            [
                {
                    'key': 'charset',
                    'value': 'utf-8'
                }
            ]
        ],
      }
    },
    methods: {
         getData() {
            var bodyFormData = new FormData();
            bodyFormData.append('reference_id', this.reference_id_search);
            bodyFormData.append('charging_date', this.charging_date_search);
            bodyFormData.append('status', this.status_search);
            bodyFormData.append('unique_id', this.unique_id_search);
            bodyFormData.append('registered_name', this.registered_name_search);
            bodyFormData.append('email', this.email_search);
            bodyFormData.append('mobile', this.mobile_search);
            bodyFormData.append('description', this.description_search);
            bodyFormData.append('card_number', this.card_number_search);

            this.axios({
                method: 'post',
                url: 'http://localhost/cc-gw/public/v1/recurring/recurringprocessdata/'+this.$route.params.id,
                data: bodyFormData
                }).then ((response) => {
                    // console.log(response.data)
                if (response.data.success == true) {
                    this.recurringProcessData = response.data['data']
                    this.totalRows = response.data['data'].length
                    let processedData = [];
                    for (let i = 0; i < this.totalRows; i++) {
                    if(this.recurringProcessData[i].status == 0)
                        var  transaction_status = 'Pending';
                    else
                        var transaction_status= 'Success';
                    if(this.recurringProcessData[i].bank_response_text == '')
                        var  response_status = 'Nil';
                        processedData.push({
                            id: this.recurringProcessData[i].id,
                            merchant_id: this.recurringProcessData[i].merchant_id,
                            merchant_name: this.recurringProcessData[i].merchant_name,
                            reference_id: this.recurringProcessData[i].reference_id,

                            unique_id : this.recurringProcessData[i].unique_user_id,
                            registered_name :this.recurringProcessData[i].registered_name,
                            email : this.recurringProcessData[i].email,
                            mobile : this.recurringProcessData[i].mobile,
                            description : this.recurringProcessData[i].description,

                            charging_date :this.recurringProcessData[i].charging_date,
                            card_number : this.recurringProcessData[i].card_number_process,
                            amount : this.recurringProcessData[i].amount,
                            remarks : response_status,
                            status : transaction_status,
                    });
                   }
                   this.processData = processedData
                   if(response.data.code == 'search')
                        this.$swal({
                                title: "Success!",
                                text: response.data.msg,
                                type: "success",
                                timer: 1500
                            })
                } else {
                    // console.log(response)
                    this.$swal({
                                title: "Error!",
                                text: 'No matching Records Found,Showing all',
                                type: "warning",
                                timer: 1500
                            })
                }
                this.resetSearch()
            }).catch ((response)=>  {
                 // this.$router.push('/recurringlist')
                // console.log('fail')
            })
        },
        searchData(evt) {
            evt.preventDefault();
            this.getData()
        },
        viewReport: function(evt) {
            this.$router.push('/'+evt)
        },
        getDate : function (date) {
                return moment(date, 'DD/MM/YYYY h:m:s a').format('D MMM YYYY, h:m:s a');
        },
        nextPage:function() {
          if((this.currentPage*this.pageSize) < this.recurringProcessData.length) this.currentPage++;
        },
        prevPage:function() {
          if(this.currentPage > 1) this.currentPage--;
        },
        resetSearch: function() {
            this.reference_id_search = '';
            this.charging_date_search = '';
            this.status_search = '';
            this.unique_id_search ='';
            this.registered_name_search = '';
            this.email_search = '';
            this.mobile_search = '';
            this.description_search = '';
        }
    },
    created()  {
        this.getData()
    },
    computed: {
        sortedrecurringProcessData:function() {

            return this.processData.filter((row, index) => {
            let start = (this.currentPage-1)*this.pageSize;
            let end = this.currentPage*this.pageSize;
            if (index >= start && index < end)
                return true;
            });
        },
        userAccess : function() {
            return this.$store.getters.userAccess
        }
    }

}

</script>
