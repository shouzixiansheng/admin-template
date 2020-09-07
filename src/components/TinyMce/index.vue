<template>
  <div>
    <input type="file" id="photoFileUpload" style="display: none" />
    <textarea :id="id"></textarea>
  </div>
</template>
<script>
import { ossUpload, uploadImg } from '@/api/public'
import '../../../static/tinymce/tinymce.min.js'
import plugins from './plugins'
import toolbar from './toolbar'
export default {
  name: 'mceeditor',
  props: {
    id: {
      type: String,
      default: function() {
        return 'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
      }
    },
    value: {
      default: '',
      type: String
    },
    config: {
      type: Object,
      default: () => {
        return {
          theme: 'modern',
          height: 400
        }
      }
    },
    url: {
      default: '',
      type: String
    },
    accept: {
      default: 'image/jpeg, image/png',
      type: String
    },
    maxSize: {
      default: 2097152,
      type: Number
    }
  },
  data() {
    return {
      tinymceId: this.id,
      myEditor: null,
      DefaultConfig: {
        // GLOBAL
        language: 'zh_CN', // 汉化
        height: 500, // 默认高度
        theme: 'modern', // 默认主题
        menubar: true,
        toolbar: toolbar,
        plugins: plugins,
        // CONFIG
        forced_root_block: 'p',
        force_p_newlines: true,
        importcss_append: true,
        // CONFIG: ContentStyle 这块很重要， 在最后呈现的页面也要写入这个基本样式保证前后一致， `table`和`img`的问题基本就靠这个来填坑了
        content_style: `
            *                         { padding:0; margin:0; }
            html, body                { height:100%; }
            img                       { max-width:100%; display:block;height:auto; }
            a                         { text-decoration: none; }
            iframe                    { width: 100%; }
            p                         { line-height:1.6; margin: 0px; }
            table                     { word-wrap:break-word; word-break:break-all; max-width:100%; border:none; border-color:#999; }
            .mce-object-iframe        { width:100%; box-sizing:border-box; margin:0; padding:0; }
            ul,ol                     { list-style-position:inside; }
          `,
        insert_button_items: 'image link | inserttable',
        // CONFIG: Paste
        paste_retain_style_properties: 'all',
        paste_word_valid_elements: '*[*]', // word需要它
        paste_data_images: true, // 粘贴的同时能把内容里的图片自动上传，非常强力的功能
        paste_convert_word_fake_lists: false, // 插入word文档需要该属性
        paste_webkit_styles: 'all',
        paste_merge_formats: true,
        nonbreaking_force_tab: false,
        paste_auto_cleanup_on_paste: false,
        // CONFIG: Font
        fontsize_formats: '10px 11px 12px 14px 16px 18px 20px 24px',
        // CONFIG: StyleSelect
        // Tab
        tabfocus_elements: ':prev,:next',
        object_resizing: true,
        // Image
        imagetools_toolbar: 'rotateleft rotateright | flipv fliph | editimage imageoptions'
      }
    }
  },
  methods: {
    setContent(content) {
      this.myEditor.setContent(content)
    },
    getContent() {
      return this.myEditor.getContent()
    },
    init() {
      const self = this
      window.tinymce.init({
        // 默认配置
        ...this.DefaultConfig,
        // 挂载的DOM对象
        selector: `#${this.tinymceId}`,
        file_picker_types: 'file',
        // 上传文件
        file_picker_callback: function(callback, value, meta) {
          let fileUploadControl = document.getElementById('photoFileUpload')
          fileUploadControl.click()
          fileUploadControl.onchange = function() {
            if (fileUploadControl.files.length > 0) {
              let localFile = fileUploadControl.files[0]
              ossUpload({ type: localFile.type }).then(res => {
                uploadImg(res.data, localFile).then(res => {
                  if (res.code === '0') {
                    callback(res.data.url, { text: localFile.name })
                    self.$emit('on-upload-complete', res) // 抛出 'on-upload-complete' 钩子
                  } else {
                    callback()
                    self.$emit('on-upload-complete', res) // 抛出 'on-upload-complete' 钩子
                  }
                })
              })
            } else {
              alert('请选择文件上传')
            }
          }
        },
        // 图片上传
        images_upload_handler: function(blobInfo, success, failure) {
          if (blobInfo.blob().size > self.maxSize) {
            failure('文件体积过大')
          }
          if (self.accept.indexOf(blobInfo.blob().type) >= 0) {
            uploadPic()
          } else {
            failure('图片格式错误')
          }
          function uploadPic() {
            ossUpload({ type: blobInfo.blob().type }).then(res => {
              uploadImg(res.data, blobInfo.blob()).then(res => {
                if (res.code === '0') {
                  success(res.data.url)
                  self.$emit('on-upload-complete', res) // 抛出 'on-upload-complete' 钩子
                } else {
                  failure('上传失败: ')
                  self.$emit('on-upload-complete', res) // 抛出 'on-upload-complete' 钩子
                }
              })
            })
          }
        },
        // prop内传入的的config
        ...this.config,
        setup: (editor) => {
          self.myEditor = editor
          editor.on(
            'init', () => {
              self.loading = true
              self.$emit('on-ready') // 抛出 'on-ready' 事件钩子
              editor.setContent(self.value)
              self.loading = false
            }
          )
          // 抛出 'input' 事件钩子，同步value数据
          editor.on(
            'input change undo redo', () => {
              self.$emit('input', editor.getContent())
            }
          )
        }
      })
    },
    destroyTinymce() {
      // 销毁tinymce
      this.$emit('on-destroy')
      const tinymce = window.tinymce.get(this.tinymceId)
      if (tinymce) {
        tinymce.destroy()
      }
    }
  },
  mounted() {
    this.init()
  },
  deactivated() {
    this.destroyTinymce()
  },
  destroyed() {
    this.destroyTinymce()
  }
}
</script>
