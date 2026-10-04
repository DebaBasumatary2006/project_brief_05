import { Link } from "react-router-dom";
import Card from "../../components/ui/Card";
import PageTitle from "../../components/ui/PageTitle";
import "./Home.css";

function Home() {
  return (
    <div className="inventory-home">
      <header className="inventory-home__header">
        <div>
          <p className="inventory-home__eyebrow">INVENTORY OPERATIONS</p>
          <PageTitle className="inventory-home__title">
            Good morning, Inventory User
          </PageTitle>
          <p className="inventory-home__intro">
            Here is a sample overview of your stock and recent activity.
          </p>
        </div>
        <Link className="inventory-home__action" to="/product-entry">
          + Add product
        </Link>
      </header>

      <section className="inventory-home__metrics" aria-label="Sample inventory metrics">
        <Card title="Products in catalog" className="inventory-metric inventory-metric--green">
          <strong>248</strong>
          <span>Across all categories</span>
        </Card>
        <Card title="Low stock items" className="inventory-metric inventory-metric--amber">
          <strong>12</strong>
          <span>Review reorder levels</span>
        </Card>
        <Card title="Purchase orders" className="inventory-metric inventory-metric--blue">
          <strong>6</strong>
          <span>Awaiting delivery</span>
        </Card>
        <Card title="Inventory value" className="inventory-metric inventory-metric--rose">
          <strong>$38,420</strong>
          <span>Sample valuation</span>
        </Card>
      </section>

      <section className="inventory-home__lower">
        <div className="inventory-panel">
          <div className="inventory-panel__heading">
            <div>
              <p className="inventory-home__eyebrow">NEEDS ATTENTION</p>
              <h2>Low stock items</h2>
            </div>
            <Link to="/dashboard">View dashboard</Link>
          </div>
          <div className="inventory-table-wrap">
            <table className="inventory-table">
              <thead>
                <tr><th>Product</th><th>SKU</th><th>Available</th><th>Status</th></tr>
              </thead>
              <tbody>
                <tr><td>Thermal paper roll</td><td>SUP-1042</td><td>4 units</td><td><span className="stock-status">Reorder</span></td></tr>
                <tr><td>Shipping carton, medium</td><td>PKG-2081</td><td>8 units</td><td><span className="stock-status">Reorder</span></td></tr>
                <tr><td>Label printer ribbon</td><td>OFF-3310</td><td>3 units</td><td><span className="stock-status">Reorder</span></td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <aside className="inventory-panel inventory-panel--activity">
          <p className="inventory-home__eyebrow">LATEST UPDATES</p>
          <h2>Recent activity</h2>
          <ul className="activity-list">
            <li><span className="activity-dot activity-dot--green" /><div><strong>Stock received</strong><p>Office supplies · 24 units</p></div><time>09:42</time></li>
            <li><span className="activity-dot activity-dot--amber" /><div><strong>Reorder needed</strong><p>Thermal paper roll · 4 left</p></div><time>Yesterday</time></li>
            <li><span className="activity-dot activity-dot--blue" /><div><strong>Product added</strong><p>Shipping carton, medium</p></div><time>Yesterday</time></li>
          </ul>
        </aside>
      </section>
    </div>
  );
}

export default Home;