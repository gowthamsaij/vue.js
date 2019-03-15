<template>
    <div class="container-fluid">

    <h3>Merchant <b style="color:green;">Successfully</b> Uploaded CSV File data</h3>
    <hr>
    &nbsp;&nbsp;&nbsp;
    <!-- //search form  -->
    <b-form @submit="onSearch" @reset="onsearchReset">
        <b-row class="my-1" >
          <b-col sm="1">
            <label>Merchant Id :</label>
          </b-col>
          <b-col sm="2">
            <b-form-input v-model="merchant_id_search" type="text" placeholder="Enter Id"  />
          </b-col>
          <b-col sm="1">
            <label>Merchant Name :</label>
          </b-col>
          <b-col sm="2">
            <b-form-input v-model="merchant_name_search" type="text" placeholder="Enter Merchant name"  />
          </b-col>
          <b-col sm="1">
            <label>Unique User Id :</label>
          </b-col>
          <b-col sm="2">
            <b-form-input v-model="user_id_search" type="text" placeholder="Enter Unique User Id"  />
          </b-col><b-col sm="1">
            <label>Registered Name :</label>
          </b-col>
          <b-col sm="2">
            <b-form-input  v-model="registered_name_search" type="text" placeholder="Enter Registered name"  />
          </b-col>
        </b-row>

        <b-row class="my-1" >
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
            <label>Rp Status :</label>
          </b-col>
          <b-col sm="2">
            <b-form-select v-model="rp_status_search"  :options="options" />
          </b-col>
        </b-row>

        <b-row class="my-1" >
          <b-col sm="1">
            <label>Frequency :</label>
          </b-col>
          <b-col sm="2">
            <b-form-input v-model="frequency_search" type="text" placeholder="Enter Frequency"  />
          </b-col>
          <b-col sm="1">
            <label>Recurrence :</label>
          </b-col>
          <b-col sm="2">
            <b-form-input v-model="recurrence_search" type="text" placeholder="Enter Recurrence period"  />
          </b-col>
          <b-col sm="1">
            <label>Charging date :</label>
          </b-col>
          <b-col sm="2">
            <b-form-input v-model="charging_date_search" type="text" placeholder="Enter Charging date"  />
          </b-col><b-col sm="1">
            <label>Start Date :</label>
          </b-col>
          <b-col sm="2">
            <datetime v-model="start_date_search"></datetime>
            <!-- <b-form-input v-model="start_date_search"  type="date" placeholder="Enter Start date"  /> -->
          </b-col>
        </b-row>
           <b-button type="submit" variant="success">Search</b-button>
           <download-excel class = "pull-right export" :data = "json_data" :fields = "json_fields" type = "csv" name = "filename.xls">
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
              <th>Unique User ID</th>
              <th>Registered Name</th>
              <th>Email Address</th>
              <th>Mobile Number</th>
              <th>Description</th>
              <th>RP Status</th>
              <th>Frequency</th>
              <th>Recurrence</th>
              <th>Charging Date</th>
              <th>Start Date</th>
              <th>Last Charging Date</th>
              <th>Next Charging Date</th>
              <th>Card Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data, index) in sortedrecurringDataList">
                <td>{{index+1}}</td>
                <td>{{data['merchant_id']}}</td>
                <td> {{data['merchant_name']}} </td>
                <td>{{data['unique_user_id']}}</td>
                <td>{{data['registered_name']}}</td>
                <td>{{data['email']}}</td>
                <td>{{data['mobile']}}</td>
                <td>{{data['description']}}</td>
                <td v-if="data['rp_status'] =='Active'" style="color:green;">{{data['rp_status']}}</td>
                <td v-else="data['rp_status']=='InActive'" style="color: red;" >{{data['rp_status']}}</td>
                <td>{{data['frequency']}}</td>
                <td>{{data['recurrence']}}</td>
                <td>{{ data['charging_date']}}</td>
                <td>{{ getDate(data['start_date'])}}</td>
                <td>last charge</td>
                <td>{{ getDate(data['next_charging_date']) }}</td>
                <td>{{ data['card_number']}}</td>
                <td>
                    <b-button variant="info" v-on:click="viewReport(data['id'])" size="sm">View</b-button>
                    <b-button variant="danger" v-if="(data['rp_status']=='Active') && (userAccess == 'merchant')"  size="sm" @click="deactivateRp(data['id'])">Deactivate</b-button>
                </td>
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
</style>

<script>
import moment from 'moment';
import { Datetime } from 'vue-datetime';

export default {
    components: {
        datetime: Datetime
      },
    data() {
      return {
        datatest : [],
        recurringDataList : [],
        pageSize : 10,
        currentPage : 1,
        totalRows : '',
        deactivateRpId  : '',
        merchant_id_search : '',
        merchant_name_search : '',
        user_id_search: '',
        registered_name_search : '',
        email_search : '',
        mobile_search : '',
        description_search : '',
        rp_status_search : null,
        frequency_search : '',
        recurrence_search : '',
        charging_date_search : '',
        start_date_search : '',
        options: [
          { value: null, text: 'Select' },
          { value: '1', text: 'Active' },
          { value: '0', text: 'InActive' }
        ],
        url : 'http://localhost/cc-gw/public/v1/recurring/showimportfile/'+this.$route.params.id,
        json_fields: {
                    'Merchant ID' : 'merchant_id',
                    'Merchant Name' : 'merchant_name',
                    'Unique User ID' : 'unique_user_id',
                    'Registered Name' : 'registered_name',
                    'Email':  'email',
                    'Mobile Number' : 'mobile',
                    'Description' : 'description',
                    'Recurring Status': 'rp_status',
                    'Frequency' : 'frequency',
                    'Recurrence' : 'recurrence',
                    'Charging Date': 'charging_date',
                    'Start Date' : 'start_date',
                    'Next Charging Date': 'next_charging_date',
                    'Card Number' : 'card_number',
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
        getData: function(){
            this.axios({
                method: 'get',
                url: this.url,
            }).then ((response) => {
                // console.log(response)
                if (response.data.success == true) {
                    this.recurringDataList = response.data['data']
                    this.totalRows = response.data['data'].length
                   let merchantIds = [];
                   for (let i = 0; i < this.totalRows; i++) {
                    if(this.recurringDataList[i].rp_status == 0)
                        var  rp_stat = 'InActive';
                    else
                        var rp_stat= 'Active';
                        merchantIds.push({
                            id: this.recurringDataList[i].id,
                            merchant_id: this.recurringDataList[i].merchant_id,
                            merchant_name: this.recurringDataList[i].merchant_name,
                            unique_user_id: this.recurringDataList[i].unique_user_id,
                            registered_name :this.recurringDataList[i].registered_name,
                            email : this.recurringDataList[i].email,
                            mobile : this.recurringDataList[i].mobile,
                            description : this.recurringDataList[i].description,
                            rp_status : rp_stat,
                            frequency : this.recurringDataList[i].frequency,
                            recurrence : this.recurringDataList[i].recurrence,
                            charging_date : this.recurringDataList[i].charging_date,
                            start_date : this.recurringDataList[i].start_date,
                            next_charging_date : this.recurringDataList[i].next_charging_date,
                            card_number : this.recurringDataList[i].card_number
                    });
                   }
                   this.json_data = merchantIds;


                } else {
                    this.$router.push('/recurringlist')
                }
            }).catch ((response)=>  {
                 this.$router.push('/recurringlist')
                // console.log('fail')
            })
        },
        viewReport: function(evt) {
            const url = '/recurringprocess/'+evt
            this.$router.push(url)
        },
        getDate : function (date) {
                return moment(date, 'DD/MM/YYYY h:m:s a').format('D MMM YYYY, h:m:s a');
        },
        nextPage:function() {
          if((this.currentPage*this.pageSize) < this.recurringDataList.length) this.currentPage++;
        },
        prevPage:function() {
          if(this.currentPage > 1) this.currentPage--;
        },
        deactivateRp(evt){
            // Use sweetalert2
            this.$swal({
                title              : "Are you sure?",
                text               : "You want to deactivate Recurring Payment for this card?",
                type               : "warning",
                showCancelButton   : true,
                confirmButtonText  : "Yes",

                }).then((result) => {
                    if (result.value == true) {
                        const url2 = 'http://localhost/cc-gw/public/v1/recurring/rpdeactivate/'+evt
                        this.axios({
                        method: 'get',
                        url: url2,
                        }).then ((response) => {
                        if (response.data.success == true) {
                            this.getData()
                            this.$swal({
                                title: "Deactivated!",
                                text: "Recurring Payment has been sucessfully deactivated",
                                type: "success",
                                timer: 1500
                            })
                        } else {
                            this.$router.push('/recurringlist')
                        }
                    }).catch ((response)=>  {
                        this.$router.push('/recurringlist')
                    })
                    } else {

                    }

                })
        },
        onSearch(evt) {
            evt.preventDefault();
            var bodyFormData = new FormData();

            bodyFormData.append('merchantId', this.merchant_id_search);
            bodyFormData.append('merchantName', this.merchant_name_search);

            bodyFormData.append('uniqueUserId', this.user_id_search);
            bodyFormData.append('registeredName', this.registered_name_search);

            bodyFormData.append('email', this.email_search);
            bodyFormData.append('mobile', this.mobile_search);

            bodyFormData.append('description', this.description_search);
            bodyFormData.append('rp_status', this.rp_status_search);

            bodyFormData.append('frequency', this.frequency_search);
            bodyFormData.append('recurrence', this.recurrence_search);

            bodyFormData.append('charge_date', this.charging_date_search);
            bodyFormData.append('start_date', this.start_date_search);

            this.axios({
                method: 'post',
                url: 'http://localhost/cc-gw/public/v1/recurring/recurringdatasearch/'+this.$route.params.id,
                data: bodyFormData
                }).then ((response) => {
                if (response.data.success == true) {
                    if(response.data.code =='not compiled') {
                        this.$swal({
                            title: "No matching records found!",
                                text: "Showing all Records",
                                type: "error",
                                timer: 1500
                        })
                    } else if (response.data.code =='showall') {
                        this.$swal({
                                title: "Showing all Records!",
                                type: "success",
                                timer: 1500
                        })
                    }
                    this.recurringDataList = response.data['data']
                    this.totalRows = response.data['data'].length
                    let merchantIds = [];
                    for (let i = 0; i < this.totalRows; i++) {
                    if(this.recurringDataList[i].rp_status == 0)
                        var  rp_stat = 'InActive';
                    else
                        var rp_stat= 'Active';
                        merchantIds.push({
                            id: this.recurringDataList[i].id,
                            merchant_id: this.recurringDataList[i].merchant_id,
                            merchant_name: this.recurringDataList[i].merchant_name,

                            unique_user_id: this.recurringDataList[i].unique_user_id,
                            registered_name :this.recurringDataList[i].registered_name,
                            email : this.recurringDataList[i].email,
                            mobile : this.recurringDataList[i].mobile,
                            description : this.recurringDataList[i].description,
                            rp_status : rp_stat,
                            frequency : this.recurringDataList[i].frequency,
                            recurrence : this.recurringDataList[i].recurrence,
                            charging_date : this.recurringDataList[i].charging_date,
                            start_date : this.recurringDataList[i].start_date,
                            next_charging_date : this.recurringDataList[i].next_charging_date,
                            card_number : this.recurringDataList[i].card_number
                    });
                   }
                   this.json_data = merchantIds;
                   this.onsearchReset()

                } else {
                    console.log(response)
                    // this.$router.push('/recurringlist')
                }
            }).catch ((response)=>  {
                 this.$router.push('/recurringlist')
                // console.log('fail')
            })
        },
        onsearchReset() {
            this.merchant_id_search = '',
            this.merchant_name_search = '',
            this.user_id_search= '',
            this.registered_name_search = '',
            this.email_search = '',
            this.mobile_search = '',
            this.description_search = '',
            this.rp_status_search = null,
            this.frequency_search = '',
            this.recurrence_search = '',
            this.charging_date_search = '',
            this.start_date_search = ''
        },
    },
    created()  {
        this.getData()
    },
    computed: {
        sortedrecurringDataList:function() {
            return this.json_data.filter((row, index) => {
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
