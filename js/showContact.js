window.onscroll = function () {
    scrollFunction_ct()
  };
  document.getElementById("contact1").style.left = "-1000px";

  
  function scrollFunction_ct() {
    console.log(document.body.scrollTop);
    console.log(document.documentElement.scrollTop);
    if (document.body.scrollTop > 600 || document.documentElement.scrollTop > 600) {
      document.getElementById("contact1").style.left = "32px";
    //   document.getElementById("backgr").style.top = "0";
    //   document.getElementById("sct").style.left = "20px";
    } else {
      document.getElementById("contact1").style.left = "-1000px";
    //   document.getElementById("backgr").style.top = "-1000px";
    //   document.getElementById("sct").style.left = "-1000px";
    // document.getElementById("contact1").style.display = "none";
    // document.getElementById("backgr").style.display = "none";
    // document.getElementById("sct").style.display = "none";
    }
  }

//   document.getElementById("contact1").style.display = "none";
//   document.getElementById("backgr").style.display = "none";
//   document.getElementById("sct").style.display = "none";