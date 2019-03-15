<template>
<div>
    <h3>Upload The Recurring File</h3>
    <hr>    <!-- Styled -->
    <br> &nbsp;&nbsp;&nbsp;&nbsp;
    <b-container>



        <b-row class="my-1">
            <b-col sm="2">
                <label for="batch">Batch Name:<span style="color:red">*</span></label>
            </b-col>
            <b-col md="8">
                 <b-form-input id="batch"   v-model="batch" type="text" placeholder="Enter Batch name" />
             </b-col>
        </b-row>
        <b-row class="my-1">
            <b-col sm="2">
                <label for="remarks">Remarks:</label>
            </b-col>
            <b-col md="8">
                <b-form-textarea  id="remarks"  v-model="remarks" placeholder="Enter Remarks" rows="3" max-rows="6" />
            </b-col>
         </b-row>
         <b-row class="my-1">
            <b-col sm="2">
                <label for="file">Upload Csv File: <span style="color:red">*</span></label>
            </b-col>
            <b-col md="8">
        <b-form-file  v-model="file" accept=".csv"  :state="Boolean(file)" placeholder="Choose a file..." id="file" ref="file" />
            </b-col>
        </b-row>
        <div class="mt-3">Selected file: {{ file ? file.name : '' }}</div>
        <br>
        <button v-on:click="submitFile()" class="btn btn-info">Submit</button>
    </b-container>

  </div>
</template>

<script>
  export default {
  name: 'importfile',
    data() {
      return {
        file : '',
        batch : '',
        remarks : '',
        merchant_id : localStorage.getItem('merchant_id'),
        merchantName : localStorage.getItem('merchantName'),
        items : []
      }
    },
    methods: {

      submitFile(){
        if(this.file == '' || this.batch == '')
        {
            this.resetForm()
            this.$swal({
                    text: 'Please fill the required fields',
                    type: "error",
                    timer: 1500
                    })
            return false;
        }
        let formData = new FormData();
        formData.append('file', this.file);
        formData.append('merchant_id', this.merchant_id);
        formData.append('merchant_name', this.merchantName);
        formData.append('batch', this.batch);
        formData.append('remarks', this.remarks);
        this.axios.post('http://localhost/cc-gw/public/v1/recurring/importfile',
          formData,
          {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
          }
        ).then((response) => {
            if(response.data.success == true) {
                this.resetForm()
                this.$swal({
                        title: "Uploaded!",
                        text: response.data.message,
                        type: "success",
                        timer: 1500
                        }).then((result) => {
                            this.$router.push('/recurringlist')
                        });
            } else {
                if(response.data.code == 'corrupted data') {
                this.$swal({
                        title: "Failed!",
                        text: response.data.message,
                        type: "error",
                        }).then((result) => {
                            this.$router.push('/recurringlist')
                        });
                } else {
                    this.$swal({
                        title: "Failed!",
                        text: response.data.message,
                        type: "error",
                        })
                }

                this.resetForm()
                return false;
            }

        })
        .catch((response) => {
            this.$swal({
                    title: "Failed!",
                    text: 'Upload Failed',
                    type: "error",
                    })
            this.resetForm()

        });

        },

        resetForm: function() {
            this.file = '';
            this.batch = '';
            this.remarks = '';
        },
        getData: function() {

        }

    },
    beforeMount(){
        //this will be called when loaded
        this.resetForm()
    },
    mounted:
      function() {
            this.getData()
        }
  }
</script>
