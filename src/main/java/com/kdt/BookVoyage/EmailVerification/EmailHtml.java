package com.kdt.BookVoyage.EmailVerification;

public class EmailHtml {
    public static String logInHTML(String userId){
        String user = userId.substring(0,4) + "****";
        return "<div style=\"display:flex; width: 250px; align-items:center\">" +
                "<h2 style=\"color: #45b751;\">BookVoyage</h2><pre> </pre>" +
                "<p style=\"color: gray; font-size:12px;\"> 로그인 알림</p>" +
                "</div><br />" +
                "<div style=\"height: 18px; width:340px; display:flex; justify-contents:space-between\">회원님의 아이디<pre> </pre><p style=\" font-weight:bold; \">" + user + "</p><pre> </pre>가 로그인 되었습니다.</div><br /><br />" +
                "<p>이 메세지는 해당 유저가 로그인 되었을 때 등록된 이메일로 전송됩니다.</p><br /><br />" +
                "<p style=\"font-size:12px\">BookVoyage를 이용해 주셔서 감사합니다.</p><p style=\"font-size:12px\">더욱 편리한 서비스를 제공하기 위해 항상 최선을 다하겠습니다.</p><br /><br />";
    }

    public static String verificationCodeHTML(String code){
        return "<div style=\"display:flex; width: 250px; align-items:center\">" +
                "<h2 style=\"color: #45b751;\">BookVoyage</h2><pre> </pre>" +
                "<p style=\"color: gray; font-size:12px;\"> 이메일 인증</p>" +
                "</div><br />" +
                "<div style=\"height: 18px; width:340px; display:flex; justify-contents:space-between\">회원님의 인증번호는<pre> </pre><p style=\" font-weight:bold; \">" + code + "</p><pre> </pre>입니다</div><br /><br />" +
                "<p style=\"font-size:12px\">BookVoyage를 이용해 주셔서 감사합니다.</p><p style=\"font-size:12px\">더욱 편리한 서비스를 제공하기 위해 항상 최선을 다하겠습니다.</p><br /><br />";
    }
}
