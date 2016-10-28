function onOpen() {
  var ui = DocumentApp.getUi();
  ui.createAddonMenu()
      .addItem('Insert link with title', 'insertLinkWithTitle')
      .addToUi();

}

function insertLinkWithTitle() {
  var doc = DocumentApp.getActiveDocument();
  var cursor = doc.getCursor();  

  if (cursor) {
    var ui = DocumentApp.getUi();
    var response = ui.prompt('Automatic Title', 'Link', ui.ButtonSet.OK_CANCEL);  
    
    // Process the user's response.
    if (response.getSelectedButton() == ui.Button.OK) {
      Logger.log('The user\'s name is %s.', response.getResponseText());
      var url = response.getResponseText();
      // if response is OK....
      var httpResponse = UrlFetchApp.fetch("http://api.sonkol.ml/v1/title-from-url?url=" + url);
      var json = httpResponse.getContentText();
      var data = JSON.parse(json);
      
      if(data.error) {
        DocumentApp.getUi().alert('Error retrieving page.');
      } else {
        var title = data.title;
        
        var element = cursor.insertText(title);
        
        if(element) {
          element.setLinkUrl(url);
          var position = doc.newPosition(element, title.length);
          doc.setCursor(position); // go to the end of the text          
        } else {
          DocumentApp.getUi().alert('Cannot insert text at this cursor location.');        
        }
      }
    } else if (response.getSelectedButton() == ui.Button.CANCEL) {
      Logger.log('Link insertion cancelled.');
    } else {
      Logger.log('The user clicked the close button in the dialog\'s title bar.');
    }
  } else {
      DocumentApp.getUi().alert('Cannot find a cursor in the document.');
  }
}
