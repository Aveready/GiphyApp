/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Servlets;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

/**
 *
 * @author edwon
 */
@WebServlet(urlPatterns = "/Save")
public class GiphySavingServlet extends HttpServlet{
    
    @Resource(lookup= "jdbc/giphy")
    private DataSource connPool;
    
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) 
                    throws ServletException, IOException {
        
        Integer userId = (Integer) req.getAttribute("userId");
        String giphyId = (String) req.getAttribute("giphyId");
        
        try (Connection conn = connPool.getConnection()) {
//            Statement stmt = conn.createStatement();
//            stmt.executeUpdate("INSERT INTO users_giphy (userId, giphyId) Values(" + userId.toString() + ", '" + giphyId + "')");
            PreparedStatement stmt = conn.prepareStatement("INSERT INTO users_giphy (userId, giphyId) Values(?, ?)");
            stmt.setInt(1, userId);
            stmt.setString(2, giphyId);
            stmt.executeUpdate();
            stmt.close();
            conn.close();
        }
        catch (SQLException ex){
            log(ex.getMessage());
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
    }
}
