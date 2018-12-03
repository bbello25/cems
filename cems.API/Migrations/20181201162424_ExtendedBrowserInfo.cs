using Microsoft.EntityFrameworkCore.Migrations;

namespace cems.API.Migrations
{
    public partial class ExtendedBrowserInfo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "SessionInfo",
                table: "ErrorLog",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SessionInfo",
                table: "ErrorLog");
        }
    }
}
