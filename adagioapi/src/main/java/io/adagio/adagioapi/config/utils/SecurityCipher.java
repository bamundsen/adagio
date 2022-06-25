package io.adagio.adagioapi.config.utils;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.MessageDigestSpi;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;
import java.util.Base64;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Value;

public class SecurityCipher {

	  private static final String KEYVALUE ="A+X;fTJP&Pd,TD9dwVq(hsHX,ya^<wsD_UK7L+@=S;{'CydP]{v@}G'b>et;yz$*\\yL5S8EJN:%P:X%H9>#nYLrX}@\\s?CQcpspH,2emzBc!Q[V'AYa~uzF8WR~AUrMzxp/V$9([S9X#zj/CH('#]B_Hc+%fGhe27YB;^j4\\Xk=Ju\"Ap~_&<L;=!Z;!,2UP;!hF3P]j85#*`&T]/kB/W^6$v~u6qpejL>kY^f)sy4:qTq_Ec!-z!@aAp~sLKGU>$";
	  private static SecretKeySpec secretKey;
	  private static byte[] key;

	    private SecurityCipher() {
	        throw new AssertionError("Static!");
	    }

	    public static void setKey() {
	        MessageDigest sha;
	        try {
	            key = KEYVALUE.getBytes(StandardCharsets.UTF_8);
	            sha = MessageDigest.getInstance("SHA-1");
	            key = sha.digest(key);
	            key = Arrays.copyOf(key, 16);
	            secretKey = new SecretKeySpec(key, "AES");
	        } catch (NoSuchAlgorithmException e) {
	            e.printStackTrace();
	        }
	    }

	    public static String encrypt(String strToEncrypt) {
	        if (strToEncrypt == null) return null;

	        try {
	            setKey();
	            Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
	            cipher.init(Cipher.ENCRYPT_MODE, secretKey);
	            return Base64.getEncoder().encodeToString(cipher.doFinal(strToEncrypt.getBytes(StandardCharsets.UTF_8)));
	        } catch (Exception e) {
	            e.printStackTrace();
	        }
	        return null;
	    }


	    public static String decrypt(String strToDecrypt) {
	        if (strToDecrypt == null) return null;
	        
	        System.out.println(secretKey);
	        try {
	            setKey();
	            Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
	            cipher.init(Cipher.DECRYPT_MODE, secretKey);
	            return new String(cipher.doFinal(Base64.getDecoder().decode(strToDecrypt)));
	        } catch (Exception e) {
	            e.printStackTrace();
	        }
	        return null;
	    }
}
