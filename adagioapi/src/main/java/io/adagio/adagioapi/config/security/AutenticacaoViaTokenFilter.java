package io.adagio.adagioapi.config.security;

import java.io.IOException;
import java.util.Optional;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.filter.OncePerRequestFilter;

import io.adagio.adagioapi.config.utils.SecurityCipher;
import io.adagio.adagioapi.models.User;
import io.adagio.adagioapi.repositories.UserRepository;


public class AutenticacaoViaTokenFilter extends OncePerRequestFilter{

//    @Value("${adagio.jwt.cookie_name}")
    private String accessTokenCookieName="accessToken";

//    @Value("${adagio.jwt.refresh_cookie_name}")
    private String refreshTokenCookieName="refreshToken";
    
	@Autowired
	private AutenticacaoService autenticacaoService;
	
	private TokenService tokenService;
	private UserRepository usuarioRepository;
	
	public AutenticacaoViaTokenFilter(TokenService tokenService,
			UserRepository usuarioRepository) {
		this.tokenService = tokenService;
		this.usuarioRepository=usuarioRepository;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		try {
			String jwt = getJwtToken(request,true);
			if(StringUtils.hasText(jwt) && tokenService.isTokenValid(jwt,"accesstoken")) {
				autenticarCliente(jwt);
			}
		} catch(Exception ex) {
			ex.printStackTrace();
		}

		filterChain.doFilter(request, response);
	}

	private void autenticarCliente(String token) {
		String login = tokenService.getLoginFromToken(token,"accesstoken");
		Optional<User> usuarioOpt = usuarioRepository.findByLogin(login);
		User usuario = usuarioOpt.orElse(null);
		UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(usuario,
				usuario, usuario.getAuthorities());
		SecurityContextHolder.
		getContext().setAuthentication(authentication);
		
	
	}

	private String getJwtFromRequest(HttpServletRequest request) {
		String bearerToken = request.getHeader("Authorization");
		if(StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
			String accessToken = bearerToken.substring(7);
			if(accessToken == null) return null;
			
//			return SecurityCipher.decrypt(accessToken);
			return accessToken;
		}
		
		return null;
	}
	
	private String getJwtFromCookie(HttpServletRequest request) {
	        Cookie[] cookies = request.getCookies();
	        for (Cookie cookie : cookies) {
	        
	            if (accessTokenCookieName != null && accessTokenCookieName.equals(cookie.getName())) {
	                String accessToken = cookie.getValue();
	             
	                if (accessToken == null) return null;

//	                return SecurityCipher.decrypt(accessToken);
	                return accessToken;
	            }
	        }
	        return null;
	    }

    private String getJwtToken(HttpServletRequest request, boolean fromCookie) {
        if (fromCookie) return getJwtFromCookie(request);

        return getJwtFromRequest(request);
    }
}
