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
                    disabled
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
                        :renderHTML="true"
                    ></mavon-editor>
                </div>
            </el-form-item>
            <el-form-item>
                <div class="button-group">
                    <el-button
                        class="job-send-button"
                        @click="saveEdit"
                        v-no-more-click
                    >
                        保存修改
                    </el-button>

                    <el-button
                        class="job-send-button-danger"
                        @click="cancleEdit"
                        v-no-more-click
                        type="danger"
                    >
                        取消
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
import { modifyQuestion } from '@/api/interviewUtil.js'

// import markdownParser from 'mavon-editor/dist/markdownParser'

const props = defineProps({
    dataBean: Object
})
const emit = defineEmits(['closeDialog', 'closeAndRefresh'])
//子组件对象
const markdowner = ref(null)
const questionTagSelectRef = ref(null)


onMounted(() => {
    //控件构建完成之后初始化tag的选择
    questionTagSelectRef.value.setSelected(props.dataBean.tagValue)
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

function validateanswer(rule, value, callback) {
    value = props.dataBean.answer

    if (value === '') {
        callback(new Error('请输入问题的回答!'))
    } else {
        callback()
    }
}
function validatetagValue(rule, value, callback) {
    var selectedTag = questionTagSelectRef.value.getSelectedTags()
    props.dataBean.tagName = selectedTag.text
    props.dataBean.tagValue = selectedTag.value
    if (
        props.dataBean.tagValue === '' ||
        !props.dataBean.tagValue == undefined
    ) {
        callback(new Error('请选择面经标签'))
    } else {
        callback()
    }
}

function saveEdit() {
    dataBeanRuleRef.value.validate((valid) => {
        if (valid) {
            modifyQuestion(props.dataBean).then((res) => {
                if (res.state.code == '200') {
                    ElMessage({
                        message: '修改成功',
                        type: 'success'
                    })
                    emit('closeAndRefresh')
                } else {
                    ElMessage({
                        message: res.state.msg,
                        type: 'warning'
                    })
                }
            })
        }
    })
}
function cancleEdit() {
    emit('closeDialog')
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
