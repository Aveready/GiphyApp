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

/**
 *
 * @author edwon
 */
@WebServlet(urlPatterns = {"/Retrieval"})
public class RetrievingServlet extends HttpServlet {
    
    @Resource(lookup = "jdbc/giphy")
    private DataSource connPool;
    
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        JsonArrayBuilder giphyBuilder = Json.createArrayBuilder();
        Integer userId = Integer.parseInt(req.getParameter("userId"));

		try (Connection conn = connPool.getConnection()) {

			PreparedStatement stmt = conn.prepareStatement("SELECT * FROM users_giphy WHERE userId = ?");
                        stmt.setInt(1, userId);
			ResultSet rs = stmt.executeQuery();

			while (rs.next()) {
				JsonObject giphy = Json.createObjectBuilder()
						.add("giphyId", rs.getString("giphyId"))
						.build();
				giphyBuilder.add(giphy);
			}
			rs.close();
		} catch (SQLException ex) {
			log(ex.getMessage());
			resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		}

		try (PrintWriter pw = resp.getWriter()) {
			resp.setStatus(HttpServletResponse.SC_OK);
			resp.setContentType(MediaType.APPLICATION_JSON);
			pw.println(giphyBuilder.build().toString());
		}
    }

}
