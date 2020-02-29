
$(function() {
    //datepicker表示イベント
    $('#inputDate').pickadate();
});

//算出ボタン押下処理
function onClickSubmit(){

	let date = $('#inputDate').val();

	// 日付が入力されていない場合は終了
	if(date==''){
		return;
	}

	// 結果出力部分を空白に
	$('#submit_result').remove();
    
	// 年、月、日をそれぞれ算出
    let year = date.substring(0,4); 
    let month = date.substring(5,7);
    let day = date.substring(8,10);
	
    let checkNext =  document.form1.next.checked;	// ヶ月後の方にチェックが入っているか
	let monthTerm = 0								// 入力したMonthの期間


	// ヶ月後を選択の際はその値を、ヶ月前を選択の場合は-1をかけたものを月の期間にセットする
    if(checkNext){
		monthTerm = $('#inputMonth').val();
    } else {
		monthTerm = $('#inputMonth').val() * -1;
	}

	// 算出する日付の月末の日にちを取得
	let endOfMonth = (function (paraYear, paraMonth) {
		let tempEndDate = new Date(paraYear, paraMonth, 0);
		return tempEndDate.getDate();
	})(year,Number(month) + Number(monthTerm));

	if (day > endOfMonth) {
		day = endOfMonth;
	} else {
		if (checkNext) {
			day = day - 1;
		} else {
			day = Number(day) + 1;
		}
	}

	// 日付の初期化
	let initDate = function () {
		let date = new Date();
		date.setDate(1);
		return date;
	};

	let newDate = initDate();

	newDate.setFullYear(year);
	newDate.setMonth(Number(month) + Number(monthTerm) - 1);
	newDate.setDate(day);
	let reultYear = newDate.getFullYear();
	let reultMonth = ('00' + (newDate.getMonth() + 1)).slice(-2);
	let reultDay = ('00' + newDate.getDate()).slice(-2);

	let result = reultYear + '年' + reultMonth + '月' + reultDay + '日';

    //メッセージ表示
	$('#result').after('<div id="submit_result" class="section__block section__block--notification"><p><strong>'
	+ result
	+ '</strong></p></div>'); 

}