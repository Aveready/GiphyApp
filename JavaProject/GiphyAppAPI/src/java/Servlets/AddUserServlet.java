/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import javax.annotation.Resource;
import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;
import javax.ws.rs.core.MediaType;

@WebServlet(name = "AddUserServlet", urlPatterns = {"/AddUser"})
public class AddUserServlet extends HttpServlet {

    @Resource(lookup = "jdbc/giphy")
    private DataSource connPool;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        JsonArrayBuilder idBuilder = Json.createArrayBuilder();
        JsonObject idReturn = null;

        try (Connection conn = connPool.getConnection()) {
            PreparedStatement stmt = conn.prepareStatement("INSERT INTO users () Values()");
            stmt.executeUpdate();

            Statement query = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM users ORDER BY userId DESC LIMIT 1");
            System.out.println("a");
            System.out.println(rs);
            System.out.println("b");
            while (rs.next()) {
                idReturn = Json.createObjectBuilder()
                        .add("userId", rs.getInt("userId"))
                        .build();
            }
            stmt.close();
            query.close();
            rs.close();

            conn.close();

        } catch (SQLException ex) {
            log(ex.getMessage());
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }

        try (PrintWriter pw = resp.getWriter()) {
            resp.setHeader("Access-Control-Allow-Origin", "*");
            resp.setHeader("Access-Control-Allow-Origin-Methods", "GET, POST, OPTIONS");
            resp.setStatus(HttpServletResponse.SC_OK);
            resp.setContentType(MediaType.APPLICATION_JSON);
            pw.println(idReturn.toString());
        }
    }

}
