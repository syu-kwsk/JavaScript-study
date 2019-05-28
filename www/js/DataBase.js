function DataBase(){
};

DataBase.prototype = {
    /*
      pick: function(fieldName,targetName){
      var Data = ncmb.DataStore("Data");
      Data.order(fieldName,false)
      .equalTo(filedName,targetName)
      .fetchAll()
      .then(function(results){
      var array = results;
      return array;
      })
      },

      extract: function(array,fieldName) {
      return array.get(fieldName);
      },
    */
    save: function(user,language,element) {
        var Data = ncmb.DataStore("Data");
        var data = new Data();

        data.set("User",user)
            .set("Language",language)
            .set("Element",element)
            .save()
            .then(function(results){
                alert("記録しました");
            })
            .catch(function(err){
                alert("save err");
            });
    },

    everyLanRecord: async function() {
        var Data = ncmb.DataStore("Data");
        await  Data.order("Language",false)
            .fetchAll()
            .then(function(results){
                var lang = document.getElementById("lang");
                var language,buff = "";
                for(i = 0;i < results.length;i++){
                    language = results[i].get("Language");
                    if(language != buff || i == 0){
                        console.log("language :" + language);
                        lang.innerHTML += "<div id='" + language
                            + "' style='font-size:20px;font-weight:900;color:blue;'>" + language + "</div><hr>";
                        buff = language;
                    }
                }
            })
            .catch(function(err) {
                alert("everyLanRecord err");
            });
        this.everyEleRecord();
    },
    
    everyEleRecord: async function() {
        var Data = ncmb.DataStore("Data");
        await  Data.order("Element",false)
            .fetchAll()
            .then(function(results){
                var Lang,langId,Elem,buff = "";
                for(i = 0;i < results.length;i++){
                    console.log("results:"+results[0].Language);
                    Elem = results[i].get("Element");
                    console.log("Elem:"+Elem);
                    if(Elem != buff || i == 0){
                        buff = Elem;
                        console.log("Element :" + Elem);
                        Lang = results[i].get("Language");
                        console.log("Lang:"+ Lang);
                        langId = document.getElementById(Lang);
                        langId.innerHTML += "<div style='font-weight:normal;color:black;'>" + results[i].get("Element") + "</div>"; 
                    }
                }
            })
            .catch(function(err){
                alert("everyEleRecord err"+ err);
            });
    },

    show_lan: function() {
        console.log("1");
        var Data = ncmb.DataStore("Data");
        Data.order("Language",false)
            .fetchAll()
            .then(function(results){
                console.log("success lang get");
                var Lname,buff = "";
                var box = document.getElementById("language");
                for(i = 0;i < results.length;i++){
                    Lname = results[i].get("Language"); 
                    if(Lname != buff || i == 0){
                        box.innerHTML += "<option value='" + Lname + "'>" +
                            Lname + "</option>";
                        buff =  Lname;
                    }
                }
                box.innerHTML += "<option value='新言語登録'>新言語登録</option>";
            })
            .catch(function(err){
                console.log("lang get err");
            });
    },

    show_ele: function() {
        var Id = document.getElementById("language");
        var Data = ncmb.DataStore("Data");
        if(Id.value == "新言語登録"){
            var target = document.getElementById("ele");
            target.innerHTML = "<br><br>言語<input type='text' id='newLang'><br>";
            target.innerHTML += "<br>要素<input type='text' id='newEle'><br><br>";
            target.innerHTML += "<input type='button' value='完了' style='font-size:20px;background-color:blue;color:white;' onclick='db.newsave();'>";
        }
        else{
            console.log(Id.value);
            Data.order("Element",false)
                .equalTo("Language",Id.value)
                .fetchAll()
                .then(function(results){
                    var elem,checkbox,buff="";
                    var target = document.getElementById("ele");
                    target.innerHTML = ""; 
                    for(i = 0;i < results.length;i++){
                        elem = results[i].get("Element");
                        if(buff != elem || i == 0){
                            buff = elem;
                            target.innerHTML += "<br><br><input type='radio' name='elem' value='"
                                + elem + "'>" + elem;
                        }
                    }
                    target.innerHTML += "<br><br><input type='button' value='完了' style='font-size:30px;' onclick='db.selectedsave();'>";
                    console.log("show success");
                })
                .catch(function(err){
                    console.log("show_ele err" + err);
                })
        }
    },

    selectedsave: function(){
        var lang = document.getElementById("language").value;
        var elem = document.getElementById("langForm").elem.value;
        console.log("lang :" + lang);
        console.log("elem :" + elem);
        this.save(ncmb.User.getCurrentUser(),lang,elem);
        document.querySelector('#navigator').resetToPage('record.html');
        var db = new DataBase();
        db.show_lan();


    },


    newsave: function(){
        var lang = document.getElementById("newLang").value;
        var elem = document.getElementById("newEle").value;
        console.log("lang :" + lang);
        console.log("elem :" + elem);
        this.save(ncmb.User.getCurrentUser(),lang,elem);
        document.querySelector('#navigator').resetToPage('record.html');
        var db = new DataBase();
        db.show_lan();

    }
};
