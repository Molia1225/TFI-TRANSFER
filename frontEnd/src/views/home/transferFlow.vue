<!--
 * @Autor: XinWei
 * @Date: 2021-03-11 15:33:30
 * @LastEditors: XinWei
 * @LastEditTime: 2021-04-08 08:46:17
 * @Description: 划转流水
-->
<template>
	<div class='transfer-flow'>
		<div class="table-header">
			<div class="date">日期</div>
			<div class="direction">方向</div>
			<div class="amount">金额</div>
			<div class="status">状态</div>
		</div>
		<van-list
			v-model="loading"
			:finished="finished"
			finished-text="没有更多了"
			@load="onLoad"
		>
			<div
				v-for="item in list"
				:key="item.transferId"
				:title="item"
				class="table-list"
			>
				<div class="date">{{item.creationDate}}</div>
				<div class="direction">{{item.type}}</div>
				<div class="amount">{{item.amount}}</div>
				<div class="status">{{item.status}}</div>
			</div>
		</van-list>
	</div>
</template>

<script>
import { List } from 'vant'
import { getTransferLog } from '../../api/userInfo';
import { jsBridge } from '@/utils/jsBridge'

export default {
	components: {
		[List.name]: List,
	},
	data () {
		return {
			list: [],
			loading: false,
			finished: false,
			fundAccount: '',
			pageNum: 1,
			pageSize: 20,
			status: {
				10: '成功',
				'-1': '失败',
				11: '失败',
        12:'成功',
        13:'失败',
				//...其他的状态码是处理中
			}
		};
	},
	mounted () {
	},
	methods: {
		onLoad () {
			if (this.list.length == 20 || this.pageNum == 1) {
				jsBridge.handleNative('getUserInfo').then(nativeObj => {
					this.fundAccount = nativeObj.userInfo.fundAccount;
					getTransferLog({
						fundAccount: this.fundAccount,
						pageNum: this.pageNum,
						pageSize: this.pageSize
					}).then(res => {
						let flowList = res.list;
						this.loading = false;
						flowList.forEach(item => {
							let type = item.type == 1 ? '港股账户至美股账户' : item.type == 2 ? '美股账户至港股账户' : '--';
							let status = ''
							if (this.status[item.state]) {
								status = this.status[item.state];
							} else {
								status = '处理中'
							}
							let amount = `${item.amount} ${item.currency}`
							this.list.push({
								type,
								creationDate: item.creationDate,
								status,
								amount,
								transferId: item.transferId
							})
						})
						if (flowList.length < 20) {
							this.finished = true;
						}
            this.pageNum++
					}).catch(err => {
						this.loading = false;
						this.finished = true;
					})
				});
			}
		},
	},
}
</script>
<style lang='less' scoped>
//@imgUrl:'../assets/images';
.transfer-flow {
	padding: 16px;
	.table-header {
		height: 30px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 12px;
		color: #8a8b96;
		margin-bottom: 10px;
		border-bottom: 1px solid #f1f3f6;
	}
	.table-list {
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid #f1f3f6;
		padding: 10px 0;
		color: #1e1f2d;
		font-size: 14px;
		div {
			line-height: 1.5;
		}
		.status {
			text-align: right;
		}
		.direction {
			width: 24%;
		}
		.amount {
			width: 22%;
		}
	}
}
</style>