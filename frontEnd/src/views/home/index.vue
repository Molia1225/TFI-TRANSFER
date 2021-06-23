<template>
	<div class="home">
		<div v-if="!submitStatus">
			<div class="trans-title">
				<span>转出账户</span>
				<span>转入账户</span>
			</div>
			<div class="trans-container">
				<div :class="targetFlag?'right-account':'left-account'">
					<div class="acc-icon"></div>
					<div class="acc-info">
						<span class="acc-title">{{targetFlag?'美股账户':'港股账户'}}</span>
						<span class="acc-num van-ellipsis">{{targetFlag?ibAccount:fundAccount}}</span>
					</div>
				</div>
				<div
					class="transfer-icon"
					@click="transferHandle"
				></div>
				<div :class="targetFlag?'left-account':'right-account'">
					<div class="acc-icon"></div>
					<div class="acc-info">
						<span class="acc-title">{{targetFlag?'港股账户':'美股账户'}}</span>
						<span class="acc-num van-ellipsis">{{targetFlag?fundAccount:ibAccount}}</span>
					</div>
				</div>
			</div>
			<div class="transfer-input">
				<van-field
					v-model="transferAmount"
					type="number"
					maxlength="20"
					@keyup="transAmountChange"
					placeholder="请输入划转金额"
				>
					<template #extra>
						<span
							class="currency"
						>{{currency}}</span><!-- @click="currencyShow=!currencyShow" -->
						<!-- <i
							@click="currencyShow=!currencyShow"
							class="triangle-down"
						></i> -->
					</template>
				</van-field>
			</div>
			<div class="account-info">
				<div class="amount">
					可划转金额：<span>{{(amount-0).toFixed(2)}}</span>
				</div>
				<div
					class="transfer-all"
					@click="transferAll"
				>
					全部划转
				</div>
			</div>
			<van-button
				color="#FD9716"
				style="font-size:16px;"
				@click="submitHandle"
				:disabled="amount==0"
				block
			>提交</van-button>
		</div>
		<div v-else>
			<div class="submit-pending"></div>
			<p class="pending-title">资金划转申请正在处理…</p>
			<van-button
				color="#FD9716"
				style="font-size:16px;"
				@click="reFreshInfo"
				block
			>我知道了</van-button>
		</div>
		<div class="btm-tips">
			<h2>温馨提示</h2>
			<p>1.资金划转功能将在以下时间段暂停使用，交易日中午12：40至下午13：35 周六下午13：00至周一凌晨4:00</p>
			<p>2.仅有美元可以划转至美股账户，如您的账户上没有美元，请联系天风国际证券客服进行美元换汇后，再进行资金划转。</p>
			<p>3.被划转资金预计将在T+1日内转入被转入账户，实际划转时间有可能更长。</p>
			<p>4.港币账户和美股账户的购买力相对独立，如果您需要同时购买港股和美股，请合理分配您的资金。</p>
			<p>5.如果您的资金划转失败，您的转出资金将在3个工作日内原路退回至转出账户。</p>
			<p>6.美股交易可以在Handy Trader手机交易软件中完成，更多交易渠道，请参考美股交易指引（<span
					@click="goGuidePage"
					class="orange"
				>点击跳转到美股交易指引页面</span>）或关注天风国际微服务公众号。</p>
		</div>
		<div
			class="currency-pop"
			v-if="currencyShow"
			@click="selectCurrency"
		>
			<div
				class="list"
				:class="currency=='HKD'?'active':''"
			>HKD</div>
			<div
				class="list"
				:class="currency=='USD'?'active':''"
			>USD</div>
			<div
				class="list"
				:class="currency=='CNH'?'active':''"
			>CNH</div>
		</div>
	</div>
</template>
<script>
import { jsBridge } from '@/utils/jsBridge'
import { Field, CellGroup, Button, Toast } from 'vant'
import { getWithdrawableCash, getFundInfo, transferToIB, getInstructionId, transferToHk, getIBAccount } from '../../api/userInfo';
import qs from 'qs'
export default {
	data () {
		let ua = window.navigator.userAgent;
		return {
			isWx: ua.indexOf('MicroMessenger') > -1,
			transferAmount: '',
			currencyShow: false,
			currency: 'USD',
			moneyType: {
				'CNH': 0,
				'USD': 1,
				'HKD': 2,
			},
			targetFlag: false,//true:TFI false:IB 
			amount: 0,
			hkData: [],
			submitStatus: false,
			ibAccount: '',
			fundAccount: '20327882',
			password: 'PlwDQy8GWHXkfZA5gxNk8FD9/7CDzyoiyC6g3mITrDGpgDxY9czVkuG20Bk1ymYFwTT5X+UJTWq4mFW7IUdBUEnEBctyWsmfKUJhv7rHpJ7pNM6gu1H0kDU4JpxfMrYj+Ww/RVMzz7fXzzYtAij6/8c4J0bgf2REg2znM2xsSykGVvnMeP3WPrp4y3UM7y6xtKK/qKVN1wT/+Wf77xNMo0C54CFrPfmtpwGTsqnPfYgb0vrk/I4ygBMkEppXfzGlxOY9J48rKyG4d+D5d8AetYXJfr8dPbNdQ3+jin8FagOSqBrJdMezl1pztPKw+EDH57XTT2SyD1+F8CsFpx21ow==',
		}
	},
	components: {
		[Field.name]: Field,
		[CellGroup.name]: CellGroup,
		[Button.name]: Button,
		[Toast.name]: Toast,
	},
	mounted () {
		//原生app信息
		// let nativeObj = jsBridge.handleNative('getUserInfo');
		jsBridge.handleNative('getUserInfo').then(nativeObj => {
			let userInfo = nativeObj.userInfo
			if (!userInfo) return
			this.fundAccount = userInfo.fundAccount;
			this.password = userInfo.password
			getIBAccount({
				fundAccount: this.fundAccount
			}).then(data => {
				this.ibAccount = data || ''
				this.getFund()
			}).catch(err => {
				console.log(err)
			})
			console.log(userInfo, '原生信息')
		})
		document.addEventListener('click', this.handlePop)
	},
	destroyed () {
		document.removeEventListener('click', this.handlePop);
	},
	methods: {
		selectCurrency (e) {
			if (e.target.className == 'list') {
				this.currency = e.target.innerText
				this.getAccountInfo()
			}
		},
		transAmountChange (e) {
			let value = e.target.value + '';
			let valueSplit = value.split('.');
			if (valueSplit.length == 2 && valueSplit[1].length > 2) {
				this.transferAmount = `${value.substring(0, value.indexOf('.'))}${value.substr(value.indexOf('.'), 3)}`
			}
		},
		getDrawableInfo () {
			Toast.loading({
				message: '加载中...',
				forbidClick: true,
				duration: 0
			});
			getWithdrawableCash({
				currency: this.currency,
				fundAccount: this.fundAccount,
				password: this.password
			}).then(result => {
				Toast.clear()
				this.amount = result.allowed_transfer_amount_to_master_no_borrow;
			}).catch(err => {
				console.log(err, '获取ib账户失败')
				setTimeout(() => { Toast.clear() }, 1000)
			})
		},
		submitHandle () {
			let transferAmount = this.transferAmount - 0;
			if (transferAmount != '') {
				if (transferAmount <= 0) {
					Toast('请输入有效的划转金额')
					return;
				}
				if (transferAmount > this.amount) {
					Toast('可划转金额不足')
					return;
				}
				this.tfiToIb()
			} else {
				Toast('请输入划转金额')
			}
		},
		tfiToIb () {
			Toast.loading({
				message: '正在划转...',
				forbidClick: true,
				duration: 0
			});
			getInstructionId({
				fundAccount: this.fundAccount,
				password: this.password,
			}).then(res => {
				let paramsObj = {
					amount: this.transferAmount,
					currency: this.currency == 'CNH' ? 'CNY' : this.currency,
					fundAccount: this.fundAccount,
					password: this.password,
					instructionId: res,
				}
				if (this.targetFlag) {
					transferToHk(qs.stringify(paramsObj)).then(result => {
						Toast.clear()
						this.transferAmount = ''
						this.submitStatus = true
					}).catch(err => {
						setTimeout(() => { Toast.clear() }, 1000)
					})
				} else {
					transferToIB(qs.stringify(paramsObj)).then(result => {
						Toast.clear()
						this.transferAmount = ''
						this.submitStatus = true
					}).catch(err => {
						setTimeout(() => { Toast.clear() }, 1000)
					})
				}
			})
		},
		reFreshInfo () {
			this.submitStatus = false
			if (this.targetFlag) {
				this.getDrawableInfo()
			} else {
				this.getFund()
			}
		},
		getFund () {
			getFundInfo({
				fundAccount: this.fundAccount,
				password: this.password
			}).then(result => {
				this.hkData = result
				this.getBalance()
			}).catch(err => {
				console.log(err, '获取账户失败')
			})
		},
		getBalance () {
			let source = this.hkData[this.moneyType[this.currency]];
			this.amount = source.fetch_balance;
			this.transferAmount = ''
		},
		showCurrencyPop () {
			this.currencyShow = !this.currencyShow
		},
		handlePop (e) {
			let className = e.target.className;
			if (className != 'currency' && className != 'triangle-down') {
				this.currencyShow = false
			}
		},
		transferAll () {
			if (parseInt(this.amount) == 0) {
				Toast('可划转金额为0')
			} else {
				this.transferAmount = (this.amount - 0).toFixed(2)
			}
		},
		getAccountInfo () {
			if (this.targetFlag) {
				this.getDrawableInfo()
			} else {
				this.getBalance()
			}
		},
		transferHandle () {
			this.targetFlag = !this.targetFlag
			this.transferAmount = ''
			this.getAccountInfo()
		},
		goGuidePage () {
			let url = location.origin + '/fundTransfer/transfer-guide'
			let jsonstr = JSON.stringify({
				url,
				title: document.title
			})
			jsBridge.handleNative('openSecondWebpage', jsonstr)
		}
	},
}
</script>
<style lang="less" scoped>
@import url('./index.less');
</style>
