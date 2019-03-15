<template>
    <div class="container-fluid">
        <h3>Merchant Uploaded CSV File List</h3>
        <hr>
        &nbsp;&nbsp;&nbsp;
        <table class="table fluid tablelayout table-hover">
          <thead class="thead-light">
            <tr>
              <th width="3%">#</th>
              <th scope="col">Created</th>
              <th scope="col">Merchant ID</th>
              <th scope="col">Merchant Name</th>
              <th scope="col">Batch Reference</th>
              <th scope="col">Uploaded File Name</th>
              <th scope="col" style="text-align: center;">Remark</th>
              <th scope="col" style="text-align: center;">Count</th>
              <th scope="col" style="text-align: center;">Uploaded By</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data, index) in sortedrecurringList">
                <td>{{index+1}}</td>
                <td>{{ getDate(data['created_at']) }}</td>
                <td>{{ data['merchant_id'] }}</td>
                <td>{{ data['merchant_name'] }}</td>
                <td>{{ data['batch_reference'] }}</td>
                <td>{{ data['uploaded_file_name'] }}</td>
                <td style="text-align: center;">{{ data['remark'] }}</td>
                <td style="text-align: center;">{{ data['count'] }}</td>
                <td style="text-align: center;">{{ data['upload_type'] }}</td>
                <td v-if="data['status']">Uploaded Successfully</td>
                <td v-else="data['status']">Upload Failed</td>
                <td>
                    <b-button variant="info" class="view" v-on:click="viewReport(data['id'])" v-if="data['status']" size="sm">View</b-button>
                    <b-button variant="danger"  v-else="data['status']" v-on:click="viewReportFail(data['id'])" size="sm">View</b-button>
                    <br>
                </td>
            </tr>
          </tbody>
        </table>
        <div class="mt-3 text-right">
              <b-pagination align="right" :total-rows="totalRows" v-model="currentPage" :per-page="pageSize" />
        </div>
    </div>
</template>


<script>
import moment from 'moment';

export default {
    data() {
      return {
        recurringList:[],
        pageSize : 10,
        currentPage : 1,
        totalRows : '',
        urlmerchant : 'http://localhost/cc-gw/public/v1/recurring/index/'+localStorage.getItem('merchant_id'),
        urladmin : 'http://localhost/cc-gw/public/v1/recurring/index/admin'
      }
    },
    methods: {
        getData: function(){
            if(this.userAccess == 'admin') {
                var ajaxurl = 'http://localhost/cc-gw/public/v1/recurring/index/admin'
            } else {
                var ajaxurl = this.urlmerchant
            }
            this.axios({
                method: 'get',
                url: ajaxurl,
            }).then ((response) => {
                this.recurringList = response.data['data']
                this.totalRows = response.data['data'].length
            }).catch ((response)=>  {

            })
        },
        viewReport: function(evt) {
            this.$router.push('/recurringdetails/'+evt)
        },
        viewReportFail: function(evt) {
            this.$router.push('/recurringfaildetails/'+evt)
        },
        downloadReport: function(evt) {
            // console.log(evt)
        },
        nextPage:function() {
          if((this.currentPage*this.pageSize) < this.recurringList.length) this.currentPage++;
        },
        prevPage:function() {
          if(this.currentPage > 1) this.currentPage--;
        },
        getDate : function (date) {
                return moment(date, 'YYYY-MM-DD H:m:s').format('D MMM YYYY, h:m:s a');
        },
    },
    created()  {

        this.getData()
    },
    computed: {
        sortedrecurringList:function() {
            return this.recurringList.filter((row, index) => {
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

<style>
.tablelayout {
    table-layout: fixed;
    width: 100%;
}
.download  {
    padding-top: 0px;
}
</style>
