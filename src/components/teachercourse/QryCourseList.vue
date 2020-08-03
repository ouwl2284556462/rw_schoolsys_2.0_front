<template>
	<main-qry-table tableTitle="课程信息" qryUrl="/TeacherSelectCourse/qryCourseList.do" rowSelectType="radio" ref="tableCmp" :setRowRowIdStrategy="rowRowIdStrategy">
		<template v-slot:formQryParamFirstLine>
			<label class="control-label col-sm-2 " for="teacher-course-qry-sel-courseName">课程名：</label>
			<div class="col-sm-3" >
				<input class="form-control" type="text"  id="teacher-course-qry-sel-courseName" name="name" placeholder="" />
			</div>
		</template>

		
		
		<template v-slot:tableHead>
			<th class="text-center">课程名</th>
			<th class="text-center ">描述</th>
		</template>
		
		<template v-slot:tableRow="{item}">
			<td class="text-center">{{item.name}}</td>
			<td class="text-center">{{item.description}}</td>
		</template>

	</main-qry-table>
</template>

<script>
	import MainQryTable from 'common/components/mainlayout/MainQryTable.vue'
	import ComUtils from 'common/js/ComUtils.js'
	
	export default{
		name: "QryCourseList",
		components:{
			MainQryTable
		},
		data() {
			return {
				rowRowIdStrategy: (item) => item.id
			};
		},
		methods:{
			getSelectId(){
				return this.$refs.tableCmp.getRadioSelectRowId();
			},
			
			getSelectItem(){
				return this.$refs.tableCmp.getRadioSelectedItemInfo();
			}
		}
	}
</script>

<style>
</style>
