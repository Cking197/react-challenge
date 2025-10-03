import { createFileRoute } from '@tanstack/react-router'
import App from '../App';

const Index = () => (
  <App />
);

export const Route = createFileRoute('/')({
  component: Index,
});