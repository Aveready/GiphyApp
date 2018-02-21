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
public class GiphySavingServlet extends HttpServlet {

    @Resource(lookup = "jdbc/giphy")
    private DataSource connPool;

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        Integer userId = Integer.parseInt(req.getParameter("userId"));
        String giphyId = req.getParameter("giphyId");

        try (Connection conn = connPool.getConnection()) {
            PreparedStatement stmt = conn.prepareStatement("INSERT INTO users_giphy (userId, giphyId) Values(?, ?)");
            stmt.setInt(1, userId);
            stmt.setString(2, giphyId);
            stmt.executeUpdate();
            stmt.close();
            conn.close();
            resp.setStatus(HttpServletResponse.SC_OK);
        } catch (SQLException ex) {
            log(ex.getMessage());
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
        
        resp.setHeader("Access-Control-Allow-Origin", "*");
        resp.setHeader("Access-Control-Allow-Origin-Methods", "GET, POST, OPTIONS");
    }
}
