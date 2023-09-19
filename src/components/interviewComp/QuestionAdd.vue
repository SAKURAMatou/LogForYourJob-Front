<template>
    <div class="question-add-wrapper">
        <!-- -->
        <el-form
            :model="dataBean"
            ref="dataBeanRuleRef"
            :rules="dataBeanRule"
            label-width="120px"
            label-position="top"
            style="padding-top: 10px"
            class="send-log-add-form"
        >
            <el-form-item
                label="面经题目："
                prop="question"
                class="el-form-item-half"
            >
                <el-input
                    v-model="dataBean.question"
                    placeholder="输入题目200字符以内"
                />
            </el-form-item>
            <el-form-item
                label="面经标签："
                prop="tagValue"
                class="el-form-item-half"
            >
                <QuestionTagSelect
                    ref="questionTagSelectRef"
                ></QuestionTagSelect>
            </el-form-item>
            <el-form-item label="答案：" prop="answer">
                <div id="editor" class="question-answer">
                    <mavon-editor
                        ref="markdowner"
                        style="height: 100%"
                        @save="markdownSave"
                        v-model="dataBean.answer"
                    ></mavon-editor>
                </div>
            </el-form-item>
            <el-form-item>
                <div class="button-group">
                    <el-button
                        class="job-send-button-primary"
                        @click="saveAndNew"
                        v-no-more-click
                        type="primary"
                    >
                        保存并新增
                    </el-button>

                    <el-button
                        class="job-send-button"
                        @click="saveAndClose"
                        v-no-more-click
                    >
                        确定新增
                    </el-button>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>
<script setup>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import { ref, reactive, onMounted } from 'vue'
import QuestionTagSelect from '@/components/interviewComp/QuestionTagSelect.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { addInterviewQuestion } from '@/api/interviewUtil.js'
import { LoginStore } from '@/stores/logjobstore/loginstroe.js'

const emit = defineEmits(['closeDialog'])
//子组件对象
const markdowner = ref(null)
const questionTagSelectRef = ref(null)
const dataBean = reactive({
    question: '',
    answer: '',
    tagName: '',
    tagValue: ''
})
const dataBeanRuleRef = ref({})
const dataBeanRule = reactive({
    question: [
        {
            required: true,
            message: '输入面经问题不超过200字符',
            trigger: 'blur'
        },
        { max: 200, message: '面经问题长度超过200字符' }
    ],
    tagValue: [
        {
            required: true,
            validator: validatetagValue
        }
    ],
    answer: [
        {
            required: true,
            validator: validateanswer
        }
    ]
})

const loginStore = LoginStore()
//暂存问题的key
let storeKey = loginStore.useremail + '_interview_question'

onMounted(() => {
    //读取暂存的数据，如果有的话提示并编辑旧数据
    let existQuestion = JSON.parse(localStorage.getItem(storeKey))
    if (existQuestion && existQuestion.type == 'ADD') {
        //存在暂存的面经时
        ElMessageBox.confirm('存在未提交面经，是否继续编辑？', '提示', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning'
        }).then(
            () => {
                // console.log('existQuestion.content', existQuestion.content)
                dataBean.answer = existQuestion.content.answer
                dataBean.question = existQuestion.content.question
                questionTagSelectRef.value.setSelected(
                    existQuestion.content.tagValue.value
                )
            },
            () => {
                //删除暂存的数据
                // console.log('取消')
                localStorage.removeItem(storeKey)
            }
        )
    }
})

function validateanswer(rule, value, callback) {
    value = dataBean.answer

    if (value === '') {
        callback(new Error('请输入问题的回答!'))
    } else {
        callback()
    }
}
function validatetagValue(rule, value, callback) {
    var selectedTag = questionTagSelectRef.value.getSelectedTags()
    dataBean.tagName = selectedTag.text
    dataBean.tagValue = selectedTag.value
    if (dataBean.tagValue === '' || !dataBean.tagValue == undefined) {
        callback(new Error('请选择面经标签'))
    } else {
        callback()
    }
}

function markdownSave(value, render) {
    // 防止用户登录失效，页面关闭等操作导致来不及保存到后台，编辑器的保存操作先把数据保存到浏览器缓存
    dataBean.tagValue = questionTagSelectRef.value.getSelectedTags()
    localStorage.setItem(
        storeKey,
        JSON.stringify({
            'type': 'ADD',
            'content': dataBean
        })
    )
}

function addNewQuestion(func) {
    dataBeanRuleRef.value.validate((valid) => {
        // console.log('dataBean', dataBean)
        if (valid) {
            addInterviewQuestion(dataBean).then((res) => {
                if (res.state.code === '200') {
                    func()
                    //提交之后删除暂存数据
                    localStorage.removeItem(storeKey)
                } else {
                    ElMessage({ message: res.state.msg, type: 'warning' })
                }
            })
        }
    })
}

function saveAndNew() {
    addNewQuestion(() => {
        dataBean.answer = ''
        dataBean.question = ''
        dataBean.tagName = ''
        dataBean.tagValue = ''
        questionTagSelectRef.value.resetSelectedTags()
    })
}

function saveAndClose() {
    addNewQuestion(() => {
        //关闭当前的弹窗
        emit('closeDialog')
    })
}
</script>

<style scoped>
.question-answer {
    /* height: 600px; */
    width: 100%;
}
.button-group {
    display: flex;

    justify-content: space-between;
    flex-direction: initial;
}
</style>
