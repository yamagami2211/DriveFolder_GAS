/*
GoogleDriveのフォルダとURLをスプレットシートに書き込む。

DriveのIDはURLから取得できます。
https://drive.google.com/drive/folders/<ここの部分>

スプレットシートのIDもURLから取得できます。
https://docs.google.com/spreadsheets/d/<ここの部分>/edit#gid=0

シートの名前はスプレットシートを開いて画面下の方にあります。

連携画面などが出ますので、指示に従って操作してください。
わからなければggってください。

実行が成功すると、スプレットシートのA列にフォルダ名、B列にURL、C2に実行した日時が表示されます。
また、A列とB列は2行目から書き込まれます。1行目には書き込みません。
*/
function DriveFoldersList() {
  var id = "<DriveのID>"; //フォルダID
  var target = DriveApp.getFolderById(id);
  var folders = target.getFolders();
  
  //スプレットシート用
  var spreadsheet = SpreadsheetApp.openById('<スプレットシートのID>');
  var sheet = spreadsheet.getSheetByName('<シートの名前>');
  
  var count = target.getFiles();
  var i = 1;
  
  var d = new Date();
  var y = d.getFullYear();
  var mon = d.getMonth() + 1;
  var d2 = d.getDate();
  var h = d.getHours();
  var min = d.getMinutes();
  var s = d.getSeconds();
  var now = y+"/"+mon+"/"+d2+" "+h+":"+min+":"+s;
  
  sheet.getRange("C2").setValue(now);

  while (folders.hasNext()) {
    i++
    
    var folder = folders.next();
    var folderName = folder.getName();
    var folderId = folder.getId();
    var url = 'https://drive.google.com/drive/folders/' + folderId;
    sheet.getRange(i, 1).setValue(folderName);
    sheet.getRange(i, 2).setValue(url);
  }
  

}


