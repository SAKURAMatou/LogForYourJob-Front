<template>
    <div class="question-add-wrapper">
        <el-form
            :model="dataBean"
            ref="dataBeanRuleRef"
            label-width="120px"
            :rules="dataBeanRule"
            label-position="top"
            style="padding-top: 10px"
            class="send-log-add-form"
        >
            <el-form-item
                label="面经题目："
                class="el-form-item-half"
                prop="cname"
            >
                <el-input
                    v-model="dataBean.question"
                    placeholder="输入题目200字符以内"
                />
            </el-form-item>
            <el-form-item
                label="面经标签："
                class="el-form-item-half"
                prop="cname"
            >
            </el-form-item>
            <el-form-item label="答案：" prop="cname">
                <div id="editor" class="question-answer">
                    <mavon-editor
                        style="height: 100%"
                        @save="markdownSave"
                        :value="dataBean.answer"
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
                        @click="addNewSendLog"
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
import { ref, reactive } from 'vue'

const dataBean = reactive({
    question: '',
    answer: '',
    tagName: '',
    tagValue: ''
})

function markdownSave(value, render) {
    dataBean.answer = render
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
