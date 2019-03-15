<template>
    <div class="container-fluid">
        <h3>Merchant <b style="color: red;">Failed</b> Uploading CSV File data</h3>
        &nbsp;&nbsp;&nbsp;
        <download-excel class = "pull-right export" :data = "json_data" :fields = "json_fields" type = "csv" name = "Failed_Report.csv">
        <button class="btn btn-info">Export</button></download-excel>
        &nbsp;&nbsp;
        <table class="table fluid table-hover">
          <thead class="thead-light">
            <tr>
              <th>#</th>
              <th>Merchant ID</th>
              <th>Merchnat Name</th>
              <th>Batch Name</th>
              <th>Uploaded File Name</th>
              <th>Line No</th>
              <th>Remarks</th>
              <th>Uploaded On</th>

            </tr>
          </thead>
          <tbody>
            <tr v-for="(data, index) in sortedrecurringFailDataList">
                <td>{{index+1}}</td>
                <td>{{ data['merchant_id'] }}</td>
                <td>{{ data['merchant_name'] }}</td>
                <td>{{ data['batch_name'] }}</td>
                <td>{{ data['uploaded_file_name'] }}</td>
                <td>{{ data['line_no'] }}</td>
                <td>{{ data['remarks'] }}</td>
                <td>{{ getDate(data['created_at']) }}</td>
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
        recurringfailDataList : [],
        pageSize : 10,
        currentPage : 1,
        totalRows : '',
        deactivateRpId  : '',
        url : 'http://localhost/cc-gw/public/v1/recurring/faileduploaddata/'+this.$route.params.id,
        json_fields: {
                    'Merchant ID' : 'merchant_id',
                    'Merchant Name' : 'merchant_name',
                    'Batch Name' : 'batch_name',
                    'Uploaded File Name' : 'uploaded_file_name',
                    'Line No' : 'line_no',
                    'Remarks' : 'remarks',
                    'Uploaded Date' : 'created_at'
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
                    this.recurringfailDataList = response.data['data']
                    this.totalRows = response.data['data'].length
                    // this.json_data = response.data['data']
                    let merchantData = [];
                   for (let i = 0; i < this.totalRows; i++) {
                        merchantData.push({
                            id: this.recurringfailDataList[i].id,
                            merchant_id: this.recurringfailDataList[i].merchant_id,
                            merchant_name: this.recurringfailDataList[i].merchant_name,
                            batch_name: this.recurringfailDataList[i].batch_name,
                            uploaded_file_name : this.recurringfailDataList[i].uploaded_file_name,
                            line_no :this.recurringfailDataList[i].line_no,
                            remarks :this.recurringfailDataList[i].remarks,
                            created_at : this.recurringfailDataList[i].created_at,
                    });
                   }
                   this.json_data = merchantData;
                } else {
                    // this.$router.push('/recurringlist')
                }
            }).catch ((response)=>  {
                 // this.$router.push('/recurringlist')

            })
        },
        viewReport: function(evt) {
            this.$router.push('/'+evt)
        },
        downloadReport: function(evt) {
            // console.log(evt)
        },
        nextPage:function() {
          if((this.currentPage*this.pageSize) < this.recurringfailDataList.length) this.currentPage++;
        },
        prevPage:function() {
          if(this.currentPage > 1) this.currentPage--;
        },
        getDate : function (date) {
                return moment(date, 'YYYY-MM-DD H:i:s').format('D MMM YYYY, h:m:s a');
        },

    },
    created()  {
        this.getData()
    },
    computed: {
        sortedrecurringFailDataList:function() {
            return this.json_data.filter((row, index) => {
            let start = (this.currentPage-1)*this.pageSize;
            let end = this.currentPage*this.pageSize;
            if (index >= start && index < end)
                return true;
            });
        }
    }

}

</script>
<style>
.pull-right {
    float: right !important;
}
.export {
    padding-bottom: 15px;
}

</style>
