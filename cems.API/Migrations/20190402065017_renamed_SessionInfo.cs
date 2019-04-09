using Microsoft.EntityFrameworkCore.Migrations;

namespace cems.API.Migrations
{
    public partial class renamed_SessionInfo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SessionInfo",
                table: "ErrorLog",
                newName: "SessionInfoJson");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SessionInfoJson",
                table: "ErrorLog",
                newName: "SessionInfo");
        }
    }
}
