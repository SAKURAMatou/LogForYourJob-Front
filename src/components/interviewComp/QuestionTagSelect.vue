<template>
    <div class="interview-question-search-tags">
        <el-check-tag
            v-for="(tag, i) in tagLsit"
            v-bind:color="tag.type"
            @click="onChange"
            v-bind:checked="tag.checked"
            v-bind:index="`${i}`"
            >{{ tag.tagName }}</el-check-tag
        >
    </div>
</template>
<script setup>
import { reactive } from 'vue'
const props = defineProps({
    tags: String
})

const tagLsit = reactive([
    { tagValue: '01', tagName: 'java', type: '2ED65D', checked: false },
    { tagValue: '02', tagName: 'spring', type: '9DC0FA', checked: false },
    { tagValue: '03', tagName: '数据库', type: 'F6C4C4', checked: false },
    { tagValue: '04', tagName: '消息队列', type: 'F2EF9D', checked: false },
    { tagValue: '05', tagName: '中间件', type: 'DAF2BC', checked: false },
    { tagValue: '06', tagName: '微服务', type: '2ED65D', checked: false }
])
function getSelectedTags() {
    //找到选中的标签
    var selected = tagLsit.filter((item) => item.checked == true)
    return {
        'text': selected.map((item) => item.tagName).join(';'),
        'value': selected.map((item) => item.tagValue).join(';')
    }
}
/**重置标签的选择 */
function resetSelectedTags() {
    tagLsit.forEach((item) => {
        item.checked = false
    })
}
function setSelected(value) {
    if (!value) {
        return
    }
    let tagValue = []
    if (typeof value == 'string') {
        tagValue = value.split(';')
    } else {
        tagValue = value
    }
    tagValue.forEach((item) => {
        for (let i in tagLsit) {
            if (tagLsit[i].tagValue == item) {
                tagLsit[i].checked = true
            }
        }
    })
}
function onChange(e) {
    var index = e.target.getAttribute('index')
    tagLsit[index].checked = !tagLsit[index].checked
}
/**
 * defineExpose把<script setup>中定义的对象暴露给组件的引用者，否则默认不会暴露
 */
defineExpose({
    getSelectedTags,
    resetSelectedTags,
    setSelected
})
</script>
