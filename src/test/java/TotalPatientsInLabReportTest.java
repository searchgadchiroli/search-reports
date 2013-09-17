import com.github.springtestdbunit.annotation.DatabaseOperation;
import com.github.springtestdbunit.annotation.DatabaseSetup;
import com.github.springtestdbunit.annotation.DatabaseTearDown;
import org.joda.time.DateTime;
import org.junit.Before;
import org.junit.Test;

import java.io.File;
import java.util.List;
import java.util.Map;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

public class TotalPatientsInLabReportTest extends DbUnitConfig {

    String sql;
    JDBCUtil jdbcUtil;

    @Before
    public void setUp() throws Exception {
        File file = new File("./jrxml/Total_Patients_in_Lab_jrxml.data.jrxml");
        sql = XMLParseUtil.readSQLFromXMl(file);
        jdbcUtil = JDBCUtil.getJDBCTemplate();

    }

    @Test
    @DatabaseSetup(value = "Total_Patients_in_Lab_Finalized_Tests.xml", type = DatabaseOperation.INSERT)
    @DatabaseTearDown(value = "Total_Patients_in_Lab_Finalized_Tests.xml", type = DatabaseOperation.DELETE)
    public void shouldReturnOnlyFinalizedTestsThatAreNotCancelled() throws Exception {
        sql = XMLParseUtil.withDates(new DateTime(2010, 9, 13, 0, 0), new DateTime(2010, 9, 14, 0, 0), sql);

        List<Map<String, Object>> results = jdbcUtil.execute(sql);

        assertThat((Long) results.get(0).get("total_test"), is(3L));
        assertThat((Long) results.get(0).get("total_patient"), is(2L));
        assertThat((String) results.get(0).get("name"), is("OPD"));
    }

    @Test
    @DatabaseSetup(value = "Total_Patients_in_Lab_With_Diff_Date_Ranges.xml", type = DatabaseOperation.INSERT)
    @DatabaseTearDown(value = "Total_Patients_in_Lab_With_Diff_Date_Ranges.xml", type = DatabaseOperation.DELETE)
    public void shouldReturnOnlyFinalizedTestsThatAreWithinGivenDateRange() throws Exception {
        sql = XMLParseUtil.withDates(new DateTime(2010, 9, 11, 0, 0), new DateTime(2010, 9, 12, 0, 0), sql);

        List<Map<String, Object>> results = jdbcUtil.execute(sql);

        assertThat((Long) results.get(0).get("total_test"), is(1L));
        assertThat((Long) results.get(0).get("total_patient"), is(1L));
        assertThat((String) results.get(0).get("name"), is("OPD"));
    }

}
