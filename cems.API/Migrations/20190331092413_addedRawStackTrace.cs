using Microsoft.EntityFrameworkCore.Migrations;

namespace cems.API.Migrations
{
    public partial class addedRawStackTrace : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "StackTraceRaw",
                table: "ErrorLog",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StackTraceRaw",
                table: "ErrorLog");
        }
    }
}
