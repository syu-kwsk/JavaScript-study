const ncmb = new NCMB("f390f3e88f724de944b3366f0e4d49f1ede7640cf0854765c277f58f5a0f0e12", "1fd4e03f5ad0f688c510b4d8e5c1c1f6fe70e69b852729d33bd215e99aeb7990");

function autoLogin() {
  var currentUser = ncmb.User.getCurrentUser();
  if (currentUser) {
    console.log("ログイン中のユーザー: " + currentUser.get("userName"));
    document.querySelector('#navigator').pushPage('record.html');
  } else {
    console.log("未ログインまたは取得に失敗");
  }
}

function signUp(){
  debugCheckuser();
  var userName = document.forms.signUpForm.signUpName.value;
  var userPassword = document.forms.signUpForm.signUpPassword.value;

  var user = new ncmb.User();

  user.set("userName", userName) /* ユーザー名 */
      .set("password", userPassword) /* パスワード */

  // ユーザーの新規登録処理
  user.signUpByAccount()
    .then(function(){
      // 登録後処理
      ncmb.User.login(userName, userPassword)
              .then(function(data){
              document.querySelector('#navigator').pushPage('record.html');
              debugCheckuser();
                var db = new DataBase();
               db.show_lan();
              })
              .catch(function(err){
              // エラー処理
                alert("login error");
                debugCheckuser();
              });
    })
    .catch(function(err){
      // エラー処理
      alert("signup error");
      debugCheckuser();
    });
}

function login(){
  var userName = document.forms.loginForm.loginName.value;
  var userPassword = document.forms.loginForm.loginPassword.value;
  console.log("user_name: " + userName);
  ncmb.User.login(userName, userPassword)
    .then(function(data){
        // ログイン後処理
       
      document.querySelector('#navigator').pushPage('record.html');
      debugCheckuser();
            var db = new DataBase();
               db.show_lan();

    })
    .catch(function(err){
      // エラー処理
      alert(err);
    });
}

function langUp() {
  debugCheckuser();
  var langName = document.forms.langForm.langName.value;
  var currentUser = ncmb.User.getCurrentUser();
  console.log(currentUser.userName);
  // 保存先クラスの作成
  var Lang = ncmb.DataStore("Lang");

  // 保存先クラスのインスタンスを生成
  var lang = new Lang();

  // 値を設定と保存
  lang.set("name", langName)
      .set("user", currentUser)
      .save()
      .then(function(object){
              // 保存に成功した場合の処理
              alert("lang success");
              document.querySelector('#navigator').resetToPage('myPage.html');
              debugCheckuser();
      })
      .catch(function(err){
        // 保存に失敗した場合の処理
        alert(err);
      });
}

function elemUp() {
  var langName=document.forms.elemForm.langName.value;
  var elemName=document.forms.elemForm.elemName.value;
  var currentUser =ncmb.User.getCurrentUser();

  var lang = ncmb.DataStore("Lang");

  lang.order("createDate",true)
            .equalTo("name", langName)
            .fetch()
            .then(function(result){
                // 保存先クラスの作成
                var Elem = ncmb.DataStore("Element");

                // 保存先クラスのインスタンスを生成
                var elem = new Elem();

                // 値を設定と保存
                elem.set("name", elemName)
                    .set("lang", result)
                    .save()
                    .then(function(object){
                            // 保存に成功した場合の処理
                            alert("success");
                            document.querySelector('#navigator').resetToPage('myPage.html');
                            debugCheckuser();
                    })
                    .catch(function(err){
                            // 保存に失敗した場合の処理
                      alert("Elementの保存に失敗しました");
                      debugCheckuser();
                    });
            })
            .catch(function(error){
                alert("Langageの検索に失敗しました：\n" + error);
            });
}

function logout(){
  ncmb.User.logout()
        .then(function(){
          document.querySelector('#navigator').resetToPage('login.html');
          debugCheckuser();
      })
      .catch(function(err){
        alert(err);
        debugCheckuser();
      });
}

function debugCheckuser() {
  var currentUser = ncmb.User.getCurrentUser();
  if (currentUser) {
    console.log("ログイン中のユーザー: " + currentUser.get("userName"));
  } else {
    console.log("未ログインまたは取得に失敗");
  }
}

// async function langSearch(){
//   var langName=document.forms.elemForm.langName.value;
//   var lang = ncmb.DataStore("Lang");
//   // var resultElements = [];

//   // lang.order("createDate",true)
//   //           .equalTo("name", langName)
//   //           .fetch()
//   //           .then(function(langResult){
//   //               // 保存先クラスの作成
//                 var elem = ncmb.DataStore("Element");
//   //               console.log("langResult.name: " + langResult.name);
//     const langQuery = lang.equalTo('objectId', "YJUODJRgwGnpjDDF");
//     const results = await elem
//       .inQuery('lang', langQuery)
//       .fetchAll()
//       .then(function(resultElements){
//                         var target = document.getElementById("lang-elements");
//                         console.log("resultElements: " +  resultElements);
//                         var texts="";
//                         resultElements.forEach( function (element) {
//                             console.log("element.name: " + element.name);
//                             texts += element.name;
//                             // document.querySelector('#navigator').resetToPage('page3.html');
//                         });
//                         target.textContent = texts;
//                         // document.querySelector('#navigator').resetToPage('lang-show.html');
//                         debug_checkuser();
//                     })
//                     .catch(function(err){
//                             // 保存に失敗した場合の処理
//                       alert(err);
//                       console.log(err);
//                       debug_checkuser();
//                     });

//     // var target = document.getElementById("lang-elements");
//     // var ahi = document.createElement('p');

//     //             console.log("results: " +  results);
//     //                     results.forEach( function (element) {
//     //                         console.log("element.name: " + element.name);
//     //                         ahi.value = element.name;
//     //                         target.insertAdjacentElement('beforend', ahi);
//     //                       });

//     //             // 値を設定と保存
//     //             elem.include("lang")
//     //                 .fetchAll()
//     //                 .then(function(resultElements){
//     //                     var target = document.getElementById("lang-elements");
//     //                     console.log("resultElements: " +  resultElements);
//     //                     resultElements.forEach( function (element) {
//     //                       if(element.lang.name == langName){
//     //                         console.log("element.name: " + element);
//     //                         target.innerText += element.name;
//     //                       }
//     //                     });
//     //                     // document.querySelector('#navigator').resetToPage('lang-show.html');
//     //                     debug_checkuser();
//     //                 })
//     //                 .catch(function(err){
//     //                         // 保存に失敗した場合の処理
//     //                   alert("Elementの保存に失敗しました");
//     //                   debug_checkuser();
//     //                 });
//             // })
//             // .catch(function(error){
//             //     alert("Langageの検索に失敗しました：\n" + error);
//             // });
// }
