<template>
  <div>agent
    <el-upload
        action=""
        :on-success="uploadSuccess"
        :http-request="uploadFile"
        :file-list="fileList"
    >
      <el-button>upload</el-button>
    </el-upload>
  </div>
</template>

<script>
import { Upload, Button } from 'element-ui'
import { storageRef, storage } from '@/includes/firebase';

export default {
  name: "agent",
  components: {
    [Upload.name]: Upload,
    [Button.name]: Button,
  },
  data () {
    return {
      fileList: [],
    }
  },
  methods: {
    uploadFile({file}) {
      // firebase upload api
      const uploadTask = storageRef.child(file.name).put(file)
      uploadTask.on(storage.TaskEvent.STATE_CHANGED, (snapshot) => {
            console.log(snapshot, 'snap')
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log('Upload is ' + progress + '% done');
      },
          (error) => {console.log(error)},
          () => {
            // Upload completed successfully, now we can get the download URL
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              console.log('File available at', downloadURL);
              this.uploadSuccess(file.name)
            });
          }
      )
    },
    uploadSuccess(filename) {
      const listRef = storageRef.child(filename)
      const listRefa = storageRef.child('files')
      console.log(listRef, listRefa, 'list', 'listRefa')
    },
    download(file) {
      console.log(file)
      // let storage = storage();
      // const pathReference = storage.ref('images/stars.jpg');
    },
  },
}
</script>

<style scoped>

</style>
