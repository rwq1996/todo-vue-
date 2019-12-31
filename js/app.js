Vue.config.devtools = true;
var vue = new Vue({

	el: '#app',
	// 静态数据
	data: {
		inputText: '',
		todos: [],
		currentEdit: null,
        whichShow: false,
        defaultShow: false,
        dataStatus: ["All", "Active", "Completed"],
        dataStatusIndex: 2,
    },
    created() {
        this.todos = this.getStroage() || [];
    
    },
	// 静态方法
	methods: {
		handleAdd(e) {
			const text = this.inputText;
		if(text!==''){
            this.todos.push({
				id: Math.random(),
				title: text,
				complayted: false
			})
        }else{
            return false;
        }
            this.inputText = ''
            this.setStroage(this.todos);
		},
		deleHande(index) {
            this.todos.splice(index, 1)
            this.setStroage(this.todos);
        },
        Selected() {//复选事件
			this.setStroage(this.todos);
		},
		deleComplaytd() {
			var flag = false;
			for (var i = 0; i < this.todos.length; i++) {
				if (this.todos[i].complayted) {
					flag = true;
					break;
				}
			}
            return flag
           
		},
		// 清除已完成任务
		deleDan() {
			for (var i = 0; i < this.todos.length; i++) {
				if (this.todos[i].complayted) {
					this.todos.splice(i, 1);
					i--
				}
            }
            this.setStroage(this.todos);
		},
		// 统计未完成的任务
		conutItem() {
			var sum = 0;
			for (var i = 0; i < this.todos.length; i++) {
				if (!this.todos[i].complayted) {
					sum += 1;
				}
			}
			return sum;
		},
		// 统计所有
		countAll(e) {
			var checked = e.target.checked
			// console.log(checked)
			this.todos.forEach(el => {
				el.complayted = checked;
			});
		},
		baocunStatus() {
			var flag = true;
			for (var i = 0; i < this.todos.length; i++) {
				if (!this.todos[i].complayted) {
					flag = false;
					break;
				}
			}

			return flag
		},
		// 当函数的函数体只有一行代码的时候可以不用定义函数名，直接调用函数体
		saveStatus(item) {
			// console.log(item)
			return this.currentEdit = item
		},
        setStroage(list) {
            window.localStorage.setItem('list', JSON.stringify(list));
        },
        getStroage() {
            return JSON.parse(window.localStorage.getItem('list'));
        },
        switchStatus(index) { 
            this.dataStatusIndex = index
            if (this.dataStatus[index] === "Active") {
                this.defaultShow = false
                this.whichShow = true
            } else if (this.dataStatus[index] === "Completed") {
                this.defaultShow = false
                this.whichShow = false
            } else if (this.dataStatus[index] === "All") {
                this.defaultShow = true
            }
	}
    },


})
